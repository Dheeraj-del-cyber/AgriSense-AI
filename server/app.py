"""
AgriSense AI Flask Application Server
Handles crop disease detection, AI recommendations, and static file serving.
"""
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

try:
    from handlers import model_handler, llm_handler, profile_handler
except ImportError:
    try:
        from server.handlers import model_handler, llm_handler, profile_handler
    except ImportError:
        import model_handler
        import llm_handler
        import profile_handler

# Set static folder to the web directory (located one level up)
app = Flask(__name__, static_folder='../web', static_url_path='')
app.register_blueprint(profile_handler.profile_bp)
profile_handler.initialize_profile_store()

# Production-safe CORS: read allowed origins from env (comma-separated)
allowed = os.getenv('ALLOWED_ORIGINS', '')
if allowed:
    origins = [o.strip() for o in allowed.split(',') if o.strip()]
    CORS(app, resources={r"/*": {"origins": origins}})
else:
    # Default: allow all origins only in non-production modes
    CORS(app)

# Security / upload limits
app.config['MAX_CONTENT_LENGTH'] = int(os.getenv('MAX_CONTENT_LENGTH', 8 * 1024 * 1024))  # 8 MB default

# Logging: integrate with gunicorn if present
logger = logging.getLogger('gunicorn.error')
if logger.handlers:
    app.logger.handlers = logger.handlers
    app.logger.setLevel(logger.level)

@app.route('/')
def index():
    """Serve the index.html file from the web folder."""
    return app.send_static_file('index.html')

@app.route('/web/<path:path>')
def send_web(path):
    """Serve other static assets from the web folder."""
    return app.send_static_file(path)


@app.route('/detect', methods=['POST'])
def detect():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    
    file = request.files['image']
    language = request.form.get('language', 'English')
    
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    # Read image bytes
    img_bytes = file.read()

    # -------------------------------------------------------------
    # STAGE 1: PLANT CHECK (Green Pixel Check)
    # -------------------------------------------------------------
    is_plant, green_percentage = model_handler.plant_check(img_bytes)
    if not is_plant:
        return jsonify({
            "error": "Invalid image. Please upload a clear plant leaf image",
            "green_percentage": round(green_percentage, 2)
        }), 400

    # -------------------------------------------------------------
    # STAGE 3 & 4: CNN PREDICTION & CONFIDENCE FILTERING
    # -------------------------------------------------------------
    prediction = model_handler.predict_image(img_bytes)
    
    if "error" in prediction:
        # Check if it was a confidence error or a server error
        status_code = 400 if "confidence" in str(prediction["error"]).lower() else 500
        return jsonify({"error": prediction["error"]}), status_code

    # -------------------------------------------------------------
    # STAGE 5: LLM GUIDANCE GENERATION
    # -------------------------------------------------------------
    # Infer crop name from disease name (e.g., 'Apple Scab' -> 'Apple')
    disease_name = prediction.get("disease", "plant")
    crop_type = "plant" 
    if "Apple" in disease_name: crop_type = "Apple"
    elif "Grape" in disease_name or "Esca" in disease_name: crop_type = "Grape"
    elif "Tomato" in disease_name or "Curl" in disease_name: crop_type = "Tomato"
    
    # Call LLM with Moisture Context (None if sensor is offline) and Language
    current_moisture = get_live_moisture()
    guidance = llm_handler.get_agricultural_guidance(disease_name, crop_type, moisture=current_moisture, language=language)
    
    # FINAL OUTPUT
    return jsonify({
        "status": "clear",
        "message": "Plant leaf detected and successfully analyzed.",
        "prediction_results": prediction,
        "guidance": guidance.get("full_guidance", "Guidance not available."),
        "moisture": current_moisture,
        "is_sensor_online": current_moisture is not None
    })

# ---------------------------------------------------------------
# CROP RECOMMENDATION ENDPOINT
# ---------------------------------------------------------------
@app.route('/recommend_crop', methods=['POST'])
def recommend_crop():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    location = data.get("location", "Unknown")
    temperature = data.get("temperature", 25)
    humidity = data.get("humidity", 50)
    soil_type = data.get("soil_type", "Loamy")
    season = data.get("season", "Kharif")
    language = data.get("language", "English")
    
    result = llm_handler.get_crop_recommendation(
        location, temperature, humidity, soil_type, season, language
    )
    
    if result.get("success"):
        return jsonify(result)
    else:
        return jsonify({"error": result.get("recommendation", "Unknown error")}), 500


# ---------------------------------------------------------------
# CHATBOT ENDPOINT — Context-Aware Multilingual RAG Farming Assistant
# ---------------------------------------------------------------
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    if not data or 'messages' not in data:
        return jsonify({"error": "No messages provided"}), 400

    messages = data['messages']
    language = data.get('language', 'English')
    user_context = data.get('user_context')

    # If moisture is available in server IoT memory, attach it to user_context if missing
    live_moist = get_live_moisture()
    if user_context and isinstance(user_context, dict):
        if 'iot_moisture' not in user_context:
            user_context['iot_moisture'] = live_moist
    elif not user_context:
        user_context = {'iot_moisture': live_moist}

    try:
        if hasattr(llm_handler, 'get_rag_chat_reply'):
            res = llm_handler.get_rag_chat_reply(messages, user_context=user_context, language=language)
            return jsonify({
                "reply": res["reply"],
                "success": True,
                "language": res.get("language", language),
                "offline_fallback": res.get("offline_fallback", False)
            })
        else:
            # Fallback legacy behavior
            payload = {
                "model": getattr(llm_handler, 'GROQ_MODEL', 'qwen/qwen3.8-27b'),
                "messages": messages,
                "temperature": 0.6,
                "max_tokens": 400
            }
            response = llm_handler.post_groq(payload, timeout=20)
            reply = response.json()['choices'][0]['message']['content'].strip()
            return jsonify({"reply": reply, "success": True})

    except Exception as e:
        print(f"Chat API Error: {e}")
        # Localized error fallback
        err_msg = str(e)
        if "429" in err_msg or "Too Many Requests" in err_msg:
            err_msg = "⚠️ AI is currently at capacity. Please wait a few seconds and try again."
        return jsonify({"error": err_msg, "success": False}), 500

# ---------------------------------------------------------------
# IOT MONITORING - Moisture Sensor Integration & Timeout Tracking
# ---------------------------------------------------------------
import time

IOT_TIMEOUT_SECONDS = 120  # Sensor is considered offline if no update for 2 minutes

iot_data = {
    "moisture": 0,
    "last_updated": "Never",
    "last_timestamp": 0
}

def get_live_moisture():
    """Returns live moisture float if sensor was updated within last 2 minutes, else None (Offline)."""
    last_ts = iot_data.get("last_timestamp", 0)
    if not last_ts:
        return None
    if (time.time() - last_ts) > IOT_TIMEOUT_SECONDS:
        return None
    return iot_data.get("moisture")

@app.route('/update_moisture', methods=['POST'])
def update_moisture():
    data = request.get_json()
    if not data or 'moisture' not in data:
        return jsonify({"error": "No moisture value provided"}), 400
    
    import datetime
    try:
        iot_data["moisture"] = float(data['moisture'])
        iot_data["last_timestamp"] = time.time()
    except (ValueError, TypeError):
        return jsonify({"error": "Invalid moisture value"}), 400
    
    iot_data["last_updated"] = datetime.datetime.now().strftime("%H:%M:%S")
    
    return jsonify({
        "success": True, 
        "received": iot_data["moisture"],
        "is_online": True
    })

@app.route('/get_moisture', methods=['GET'])
def get_moisture():
    live_moist = get_live_moisture()
    is_online = live_moist is not None
    return jsonify({
        "moisture": live_moist if is_online else 0,
        "live_moisture": live_moist,
        "is_online": is_online,
        "last_updated": iot_data.get("last_updated", "Never")
    })

if __name__ == '__main__':
    # Threaded=True for responsiveness when running locally
    debug_mode = os.getenv('FLASK_DEBUG', '0') in ['1', 'true', 'True']
    app.run(debug=debug_mode, host='0.0.0.0', port=int(os.getenv('PORT', 5000)), threaded=True)


# ---------- Production-friendly error handlers ----------
@app.errorhandler(413)
def too_large(e):
    return jsonify({"error": "Uploaded file is too large (max 8MB)."}), 413


@app.errorhandler(404)
def not_found(e):
    # If the request expects JSON (API), return JSON
    if request.path.startswith('/api') or request.path.startswith('/detect') or request.path.startswith('/chat') or request.path.startswith('/recommend'):
        return jsonify({"error": "Not found"}), 404
    return app.send_static_file('index.html')


@app.errorhandler(Exception)
def handle_exception(e):
    app.logger.exception('Unhandled Exception: %s', e)
    return jsonify({"error": "Internal server error"}), 500

"""
AgriSense AI LLM Agricultural Guidance Handler
Integrates with Groq API for AI crop advisory and disease treatment plans.
"""
import os
import requests
import json
try:
    from dotenv import load_dotenv
    # Load from current directory and server/.env
    load_dotenv()
    env_server = os.path.join(os.path.dirname(__file__), '..', '.env')
    if os.path.exists(env_server):
        load_dotenv(env_server)
except ImportError:
    pass

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

# --- SET YOUR API KEY HERE ---
# You can also set it in a .env file as: GROQ_API_KEY=your_key_here
GROQ_API_KEY = os.getenv("GROQ_API_KEY") 

DEFAULT_GROQ_MODEL = "qwen/qwen3.8-27b"
FALLBACK_GROQ_MODELS = ["openai/gpt-oss-120b", "openai/gpt-oss-20b"]
GROQ_MODEL = os.getenv("GROQ_MODEL", DEFAULT_GROQ_MODEL)

# Comprehensive Local Agronomic Advisory (Guarantees UI Never Breaks on Rate Limit)
LOCAL_ADVISORY_DATA = {
    "Apple Scab": {
        "recovery": [
            "Prune infected twigs and collect/burn all fallen leaves immediately.",
            "Apply a curative bio-fungicide or copper spray early in the morning."
        ],
        "organic": [
            "Apply liquid copper fungicide or sulfur powder weekly during damp periods.",
            "Foliar spray with Bacillus subtilis to colonize leaf surfaces."
        ],
        "chemical": [
            "Apply Captan 50 WP (2g/L) or Myclobutanil at early pink bud stage.",
            "Rotate with Mancozeb to prevent fungicide resistance."
        ],
        "prevention": [
            "Plant scab-resistant apple cultivars like Liberty, Freedom, or Enterprise.",
            "Rake and destroy fallen leaves in autumn to disrupt overwintering spores.",
            "Prune canopy for maximum sunlight exposure and rapid leaf drying."
        ]
    },
    "Bacterial Spot": {
        "recovery": [
            "Prune and safely discard heavily spotted lower leaves.",
            "Never work among or prune wet foliage to prevent spreading bacteria."
        ],
        "organic": [
            "Spray copper hydroxide or copper octanoate (fixed copper).",
            "Apply Bacillus amyloliquefaciens (Serenade ASO) as a preventative bio-bactericide."
        ],
        "chemical": [
            "Spray copper oxychloride mixed with Mancozeb for synergistic bacterial control.",
            "Apply Streptomycin sulfate spray where approved for agricultural use."
        ],
        "prevention": [
            "Use certified pathogen-free seeds and hot-water treated seedlings.",
            "Implement a strict 2-3 year crop rotation away from solanaceous plants.",
            "Use drip irrigation exclusively to keep foliage completely dry."
        ]
    },
    "Black Rot": {
        "recovery": [
            "Prune out infected leaves, cankers, and mummified fruit 6-8 inches below damage.",
            "Sanitize pruning tools with 70% isopropyl alcohol between every cut."
        ],
        "organic": [
            "Apply Bordeaux mixture (copper sulfate + lime) after rain events.",
            "Use sulfur dust or wettable sulfur during early shoot emergence."
        ],
        "chemical": [
            "Apply Mancozeb or Captan from early bloom until 2 weeks before harvest.",
            "Use Myclobutanil or Thiophanate-methyl if systemic infection is detected."
        ],
        "prevention": [
            "Remove all mummies and pruned wood from the orchard floor.",
            "Maintain open vine/tree canopy architecture to minimize leaf wetness duration.",
            "Control insect vectors that create wound entry points."
        ]
    },
    "Cedar Apple Rust": {
        "recovery": [
            "Inspect nearby cedar or juniper trees and prune out brown galls with orange horns.",
            "Apply a preventative fungicide immediately to protect expanding leaves."
        ],
        "organic": [
            "Spray sulfur or copper soap from tight cluster stage through petal fall.",
            "Use neem oil as a mild preventative on young foliage."
        ],
        "chemical": [
            "Apply Myclobutanil (Immunox) at 7-10 day intervals during spore release.",
            "Use Propiconazole or Mancozeb for broad-spectrum rust coverage."
        ],
        "prevention": [
            "Plant rust-immune or resistant varieties (e.g., Redfree, Prima, Pristine).",
            "Remove eastern red cedar trees within a 1-2 mile radius where feasible.",
            "Time protective fungicide applications with spring rain events."
        ]
    },
    "Early Blight": {
        "recovery": [
            "Strip and destroy lower yellowing leaves showing concentric bullseye rings.",
            "Stake or trellis plants immediately to lift foliage away from soil."
        ],
        "organic": [
            "Apply Bacillus subtilis bio-fungicide weekly to suppress fungal spore germination.",
            "Spray cold-pressed neem oil (0.5%) or copper octanoate."
        ],
        "chemical": [
            "Apply Chlorothalonil (Daconil) or Mancozeb 75 WP at first sign of spots.",
            "Rotate with Azoxystrobin or Difenoconazole to prevent resistance."
        ],
        "prevention": [
            "Apply a 2-3 inch thick organic mulch layer to prevent soil splash onto leaves.",
            "Rotate crops annually—never follow tomatoes after potatoes or peppers.",
            "Water exclusively at soil level using soaker hoses or drip tape."
        ]
    },
    "Esca (Black Measles)": {
        "recovery": [
            "Mark symptomatic vines and selectively prune diseased cordons back to white healthy wood.",
            "Immediately apply wound sealants or fungicidal paste to all large pruning cuts."
        ],
        "organic": [
            "Treat pruning wounds with Trichoderma atroviride protective formulations.",
            "Incorporate compost and biochar to foster vigorous, disease-suppressive soil."
        ],
        "chemical": [
            "Apply tebuconazole or pyraclostrobin pastes directly to pruning wounds.",
            "Use sodium tetraborate foliar sprays where authorized."
        ],
        "prevention": [
            "Delay pruning until late winter during dry, clear weather windows.",
            "Sterilize shears between individual vines using 10% bleach or ethanol.",
            "Avoid creating excessive or oversized pruning wounds on older trunks."
        ]
    },
    "Healthy": {
        "recovery": [
            "Plant exhibits excellent vigor with no detectable pathogens.",
            "Continue standard agronomic management and moisture monitoring."
        ],
        "organic": [
            "Apply vermicompost or seaweed extract foliar spray every 3 weeks for sustained immunity.",
            "Maintain soil biodiversity with compost tea and beneficial mycorrhizae."
        ],
        "chemical": [
            "No chemical fungicides or pesticides required."
        ],
        "prevention": [
            "Monitor soil moisture sensors regularly to maintain optimal hydration.",
            "Keep farm perimeter free of weeds that harbor insect vectors.",
            "Perform seasonal soil testing to balance nitrogen, phosphorus, and potassium."
        ]
    },
    "Late Blight": {
        "recovery": [
            "Immediately bag and remove all infected plants—do NOT compost infected tissue.",
            "Immediately stop all sprinkler and overhead watering across the plot."
        ],
        "organic": [
            "Apply copper sulfate (Bordeaux mixture) immediately to all neighboring healthy plants.",
            "Use potassium bicarbonate foliar spray as a protective contact barrier."
        ],
        "chemical": [
            "Apply systemic Metalaxyl (Ridomil Gold MZ) or Cymoxanil without delay.",
            "Alternate with Dimethomorph or Fluopicolide every 5-7 days in wet conditions."
        ],
        "prevention": [
            "Destroy volunteer potato tubers and weed hosts (e.g., nightshades) in spring.",
            "Plant certified disease-free seed potatoes and blight-resistant tomato varieties.",
            "Increase plant spacing significantly to ensure rapid air flow and canopy drying."
        ]
    },
    "Leaf Blight": {
        "recovery": [
            "Prune blighted foliage from lower branches and burn or bury off-site.",
            "Aerate soil surface to improve water drainage and reduce humidity."
        ],
        "organic": [
            "Apply Neem seed kernel extract (5%) or copper oxychloride.",
            "Inoculate soil with Trichoderma harzianum to outcompete soilborne pathogens."
        ],
        "chemical": [
            "Spray Mancozeb (2.5 g/L) or Carbendazim 50 WP (1 g/L) at 10-day intervals.",
            "Use Propiconazole 25 EC for fast-acting systemic cure."
        ],
        "prevention": [
            "Avoid high-nitrogen fertilizer spikes that create overly succulent, susceptible tissue.",
            "Ensure proper field drainage and avoid standing water pools.",
            "Practice deep summer plowing to bury crop residues and fungal sclerotia."
        ]
    },
    "Septoria Leaf Spot": {
        "recovery": [
            "Prune off lower leaves exhibiting dark circular spots with gray centers.",
            "Avoid handling foliage while wet from rain, irrigation, or heavy dew."
        ],
        "organic": [
            "Apply liquid copper octanoate or sulfur-based organic sprays every 7 days.",
            "Spray potassium bicarbonate solution (3g/L) with horticultural oil sticker."
        ],
        "chemical": [
            "Spray Chlorothalonil or Mancozeb as soon as initial spots appear.",
            "Rotate with Pyraclostrobin or Quadris (Azoxystrobin) for systemic defense."
        ],
        "prevention": [
            "Apply a clean mulch layer (straw, paper, or plastic) beneath all plants.",
            "Enforce a strict 3-year solanaceous crop rotation schedule.",
            "Clear all crop debris and burn or hot-compost at the end of every season."
        ]
    },
    "Yellow Leaf Curl Virus": {
        "recovery": [
            "Immediately pull up and destroy stunted, curled plants (virus is incurable in plants).",
            "Focus all immediate efforts on eliminating whiteflies (Bemisia tabaci) vectors."
        ],
        "organic": [
            "Hang yellow sticky traps (1 trap per 10 square meters) above plant canopy.",
            "Spray cold-pressed neem oil (1%) or insecticidal potassium soaps under leaf undersides.",
            "Lay reflective silver or aluminum plastic mulch to confuse incoming whiteflies."
        ],
        "chemical": [
            "Apply Imidacloprid 17.8 SL (0.3 ml/L) or Acetamiprid 20 SP for whitefly knockdown.",
            "Rotate with Spiromesifen or Pyriproxyfen to break whitefly egg/nymph lifecycles."
        ],
        "prevention": [
            "Erect 50-mesh insect-proof netting over nursery beds and greenhouse vents.",
            "Plant TYLCV-resistant hybrids (e.g., US 1140, Abhinav, or Tyking varieties).",
            "Eradicate weed hosts like Datura, Parthenium, and Malva from field perimeters."
        ]
    }
}

def get_local_advisory_json(disease_name):
    """Returns structured agronomic advisory fallback matching the UI schema."""
    d_clean = disease_name.strip()
    if d_clean in LOCAL_ADVISORY_DATA:
        return LOCAL_ADVISORY_DATA[d_clean]
    
    d_lower = d_clean.lower()
    for key, val in LOCAL_ADVISORY_DATA.items():
        if key.lower() in d_lower or d_lower in key.lower():
            return val
            
    return {
        "recovery": [
            f"Isolate affected {disease_name} foliage immediately to stop potential spread.",
            "Ensure adequate ventilation and check soil moisture levels."
        ],
        "organic": [
            "Apply broad-spectrum organic neem oil spray (0.5%) to foliage.",
            "Foliar spray with Bacillus subtilis bio-fungicide or compost tea."
        ],
        "chemical": [
            "Apply broad-spectrum copper oxychloride or Mancozeb fungicide.",
            "Consult local agricultural extension service for targeted chemistry."
        ],
        "prevention": [
            "Practice 2-3 year crop rotation away from susceptible plant families.",
            "Use drip irrigation to keep canopy foliage dry at all times.",
            "Sterilize garden tools between handling different crop rows."
        ]
    }

def get_local_crop_rec(location, season, soil_type):
    """Returns local crop recommendation fallback matching UI schema."""
    crops_map = {
        "Kharif": ["Rice (Paddy)", "Maize", "Cotton", "Soybean", "Pigeon Pea (Arhar)"],
        "Rabi": ["Wheat", "Mustard", "Chickpea (Gram)", "Barley", "Green Peas"],
        "Zaid": ["Cucumber", "Watermelon", "Muskmelon", "Bitter Gourd", "Fodder Sorghum"],
        "Summer": ["Moong (Green Gram)", "Urad (Black Gram)", "Okra (Bhindi)", "Cowpea"]
    }
    crops = crops_map.get(season, ["Maize", "Legumes", "Vegetables", "Sorghum"])
    return {
        "recommended_crops": crops[:4],
        "reasoning": f"Based on {soil_type} soil characteristics and typical {season} climatic conditions in {location}, these crops offer high yield stability, favorable moisture efficiency, and strong disease resistance.",
        "preparation": f"Perform deep plowing to improve {soil_type} soil aeration. Incorporate 5-10 tons/ha of well-rotted farmyard manure (FYM) to enhance microbial activity and moisture retention before sowing."
    }

def post_groq(payload, timeout=15):
    """
    Sends request to Groq API with:
    1. Multi-key rotation (comma-separated GROQ_API_KEY).
    2. Model fallback across [GROQ_MODEL] + FALLBACK_GROQ_MODELS (each model has its own 8k TPM bucket).
    3. Automatic backoff retry on 429 if rate limit reset is small.
    """
    raw_key = os.getenv("GROQ_API_KEY") or ""
    keys = [k.strip() for k in raw_key.split(",") if k.strip()]
    if not keys:
        raise ValueError("GROQ_API_KEY is not set.")

    models_to_try = [GROQ_MODEL] + [m for m in FALLBACK_GROQ_MODELS if m != GROQ_MODEL]
    last_err = None
    
    for key in keys:
        headers = {"Authorization": f"Bearer {key}"}
        for model_name in models_to_try:
            payload["model"] = model_name
            try:
                res = requests.post(
                    GROQ_API_URL,
                    headers=headers,
                    json=payload,
                    timeout=timeout
                )
                if res.status_code == 200:
                    return res

                # 400 or 404: Model not available/decommissioned -> try next model
                if res.status_code in (400, 404):
                    last_err = res
                    continue

                # 429: Rate Limit -> check retry-after, then try next model/key
                if res.status_code == 429:
                    last_err = res
                    retry_after = res.headers.get("retry-after")
                    wait_s = 0
                    if retry_after and retry_after.isdigit():
                        wait_s = int(retry_after)
                    
                    # If reset is very quick (<= 2s), sleep briefly and retry once
                    if 0 < wait_s <= 2:
                        import time
                        time.sleep(wait_s + 0.2)
                        retry_res = requests.post(GROQ_API_URL, headers=headers, json=payload, timeout=timeout)
                        if retry_res.status_code == 200:
                            return retry_res
                    
                    # Otherwise hop to next model or next key which has fresh quota
                    continue

                res.raise_for_status()

            except requests.exceptions.RequestException as e:
                last_err = e
                if isinstance(e, requests.exceptions.HTTPError) and e.response is not None:
                    if e.response.status_code in (400, 404, 429):
                        continue
                raise e
            
    if isinstance(last_err, requests.Response):
        last_err.raise_for_status()
    elif last_err:
        raise last_err
    raise RuntimeError("Failed to connect to Groq API.")

def get_agricultural_guidance(disease_name, crop_type="plant", moisture=None, language="English"):
    """
    Calls Groq LLM for expert agricultural advice.
    Falls back gracefully to local agronomist knowledge on rate limits.
    """
    raw_key = os.getenv("GROQ_API_KEY") or ""
    if not raw_key.strip():
        local = get_local_advisory_json(disease_name)
        return {"full_guidance": json.dumps(local), "success": True, "offline_fallback": True}

    moisture_context = f"The current soil moisture level is {moisture}%." if moisture is not None else "Soil moisture data is unavailable."
    
    prompt = f"""A farmer has a {crop_type} plant with '{disease_name}'. 
{moisture_context}

Provide an expert agricultural treatment plan in JSON format with these exact keys:
- 'recovery': list of strings (quick recovery steps)
- 'organic': list of strings (organic/sustainable cures)
- 'chemical': list of strings (recommended chemical solutions)
- 'prevention': list of strings (future prevention strategies)

Ensure the advice is specific to the detected disease and current moisture level.
CRITICAL: You MUST respond in {language}. All values in the JSON output MUST be in {language} (except keys which remain English)."""

    payload = {
        "model": GROQ_MODEL,
        "messages": [
            {"role": "system", "content": "You are a professional agronomist. Output ONLY valid JSON."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.4,
        "max_tokens": 800,
        "response_format": { "type": "json_object" }
    }

    try:
        response = post_groq(payload, timeout=15)
        guidance = response.json()['choices'][0]['message']['content']
        return {"full_guidance": guidance, "success": True}
        
    except Exception as e:
        print(f"[llm_handler] Online advisory failed ({e}), using local agronomic fallback.")
        local = get_local_advisory_json(disease_name)
        return {
            "full_guidance": json.dumps(local),
            "success": True,
            "offline_fallback": True
        }

def get_crop_recommendation(location, temperature, humidity, soil_type, season, language="English"):
    raw_key = os.getenv("GROQ_API_KEY") or ""
    if not raw_key.strip():
        local_rec = get_local_crop_rec(location, season, soil_type)
        return {"recommendation": local_rec, "success": True, "offline_fallback": True}

    prompt = f"""Based on the following agricultural parameters:
- Location: {location}
- Temperature: {temperature}°C
- Humidity: {humidity}%
- Soil Type: {soil_type}
- Season: {season}

Provide the best crop recommendations suitable for these conditions.
Return the response in JSON format with these exact keys:
- 'recommended_crops': list of strings (top 3-5 crops)
- 'reasoning': string (brief explanation of why these crops suit the conditions)
- 'preparation': string (brief soil or field preparation tips)

CRITICAL: You MUST respond in {language}. All values in the JSON output MUST be in {language} (except keys which remain English)."""

    payload = {
        "model": GROQ_MODEL,
        "messages": [
            {"role": "system", "content": "You are a professional agronomist. Output ONLY valid JSON."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.4,
        "max_tokens": 600,
        "response_format": { "type": "json_object" }
    }

    try:
        response = post_groq(payload, timeout=15)
        data = json.loads(response.json()['choices'][0]['message']['content'])
        return {"recommendation": data, "success": True}
        
    except Exception as e:
        print(f"[llm_handler] Online crop rec failed ({e}), using local agronomic fallback.")
        local_rec = get_local_crop_rec(location, season, soil_type)
        return {
            "recommendation": local_rec,
            "success": True,
            "offline_fallback": True
        }



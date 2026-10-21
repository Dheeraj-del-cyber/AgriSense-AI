"""
AgriSense AI API Connectivity and Key Verification Test
"""
import requests
import os
from dotenv import load_dotenv

# Load key from .env (root or server/.env)
load_dotenv()
load_dotenv(os.path.join(os.path.dirname(__file__), '..', 'server', '.env'))

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
# Use the key from .env or fallback to hardcoded (for testing)
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_MODEL = os.getenv("GROQ_MODEL", "qwen/qwen3.8-27b")

def test_key():
    if not GROQ_API_KEY:
        print("ERROR: GROQ_API_KEY is not set. Please add it to your server/.env file.")
        return
        
    print(f"Testing Key: {GROQ_API_KEY[:10]}... with Model: {GROQ_MODEL}")
    payload = {
        "model": GROQ_MODEL,
        "messages": [{"role": "user", "content": "Hello"}],
        "max_tokens": 10
    }
    headers = {"Authorization": f"Bearer {GROQ_API_KEY}"}
    
    try:
        response = requests.post(GROQ_API_URL, headers=headers, json=payload)
        if response.status_code == 200:
            print("SUCCESS: Your Groq API key and model are working properly!")
            reply = response.json()['choices'][0]['message']['content'].strip()
            print(f"Reply: {reply.encode('ascii', 'replace').decode()}")
        elif response.status_code == 401:
            print("ERROR 401: Unauthorized. Your API key is invalid or expired.")
            print("Please go to https://console.groq.com/ to generate a new key.")
        elif response.status_code == 404:
            print(f"ERROR 404: Model '{GROQ_MODEL}' not found or decommissioned.")
            print("Response:", response.text)
        else:
            print(f"ERROR {response.status_code}: {response.text}")
    except Exception as e:
        print(f"CONNECTION ERROR: {e}")


if __name__ == "__main__":
    test_key()

# 🌱 AgriAI

### AI-Powered Crop Disease Detection and Smart Farming Assistant


---

## 📌 Project Overview

AgriAI is an AI- and IoT-based smart farming solution designed to help farmers detect crop diseases early, understand crop health, and make informed farming decisions.

Farmers can upload or capture a leaf image using the application. The system analyzes the image using computer vision and deep learning to identify supported crop diseases. It also integrates weather information and real-time soil moisture readings to provide relevant farming guidance.

The platform includes crop recommendations, an AI-powered multilingual chatbot, and basic offline support to improve accessibility for farmers in rural areas with limited internet connectivity.

---

## 🎯 Objectives

- Detect crop diseases from leaf images using AI.
- Provide timely and understandable farming guidance.
- Monitor soil moisture using IoT sensors.
- Integrate weather information into farming decisions.
- Recommend suitable crops based on available soil, weather, and regional data.
- Support farmers through a multilingual chatbot.
- Improve accessibility on low-end smartphones and unreliable networks.

---

## ✨ Key Features

### 1. AI-Based Disease Detection
- Upload or capture crop leaf images.
- Use OpenCV to check image quality and detect blur.
- Use YOLO to detect and locate the leaf.
- Use a CNN model to classify healthy leaves and supported diseases.
- Display the predicted condition and confidence score.

### 2. Smart Farming Advisory
- Combine disease predictions, weather information, and soil moisture readings.
- Generate farming guidance using the Grok API and trusted agricultural information.
- Provide basic recommendations from a local knowledge base when offline.

### 3. IoT-Based Soil Monitoring
- Use an ESP32 connected to a soil moisture sensor.
- Collect soil moisture readings.
- Use the readings to support irrigation and crop management decisions.

### 4. Weather Integration
- Retrieve available weather information through a weather API.
- Include temperature, humidity, rainfall, and wind speed where supported.
- Use weather conditions to provide more relevant farming guidance.

### 5. AI-Based Crop Recommendation
- Use a Random Forest machine learning model.
- Consider available soil characteristics, weather, season, and regional data.
- Present suitable crop options to help farmers make informed decisions.

### 6. Multilingual AI Chatbot
- Allow farmers to ask farming-related questions in supported languages.
- Use the Grok API for online responses.
- Provide predefined guidance through a local knowledge base when internet access is unavailable.

### 7. Offline and Low-Network Support
- Cache previously viewed results and essential information.
- Provide access to saved farming guidance.
- Queue selected requests for synchronization when connectivity returns.
- Optimize the interface for low-end smartphones and slower networks.

> **Note:** Live weather updates, Grok API responses, and cloud-based AI predictions require internet connectivity unless suitable offline alternatives are implemented.

---

## 🛠️ Technology Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React.js / Next.js |
| **UI Styling** | Tailwind CSS |
| **Backend** | Python, FastAPI |
| **Leaf Detection** | YOLO |
| **Disease Classification** | CNN, TensorFlow/Keras or PyTorch |
| **Image Processing** | OpenCV |
| **Crop Recommendation** | Random Forest, Scikit-learn |
| **IoT Hardware** | ESP32, Soil Moisture Sensor |
| **Weather Information** | Weather API |
| **AI Chatbot and Advisory** | Grok API (xAI) |
| **Database** | PostgreSQL |
| **Offline Knowledge Base** | JSON / SQLite |
| **Deployment** | Vercel, Render |
| **Version Control** | Git, GitHub |

---

## 🔄 How It Works

1. The farmer captures or uploads a crop leaf image.
2. The system checks the image quality and detects blur.
3. YOLO identifies and locates the leaf.
4. The CNN model predicts the leaf's health condition.
5. The system retrieves weather information and soil moisture readings.
6. The advisory engine combines the available information to generate relevant farming guidance.
7. The crop recommendation model suggests suitable crop options.
8. The farmer views the results and can ask further questions through the multilingual chatbot.

---

## 🌾 Expected Impact

- Earlier identification of supported crop diseases.
- Better access to farming information.
- Improved awareness of soil moisture and weather conditions.
- More informed crop selection.
- Easier access to agricultural guidance for farmers in rural areas.
- Increased accessibility through multilingual and offline-friendly features.

---

## 🔮 Future Enhancements

- Expand disease detection to support more crops and diseases.
- Improve model performance using diverse, real-world agricultural images.
- Add regional agricultural datasets and verified treatment recommendations.
- Expand language support.
- Introduce additional IoT sensors for environmental monitoring.
- Develop more comprehensive offline AI capabilities.

---

## ⚠️ Important Note

AgriAI is designed to support farming decisions, not replace agricultural experts. AI predictions are estimates and should be validated against real-world conditions. Disease-specific treatments and pesticide recommendations should be based on verified agricultural guidance.

---

**AgriAI** — *From a single leaf to smarter farming decisions.* 🌱

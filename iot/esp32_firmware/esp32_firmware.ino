#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h>

// ==================================
// WIFI CONFIGURATION
// ==================================

const char* WIFI_SSID = "CMF";
const char* WIFI_PASSWORD = "*";

// ==================================
// BACKEND CONFIGURATION
// ==================================

const char* SERVER_URL =
"https://ipbl-p70f.onrender.com/update_moisture";

// ==================================
// SENSOR CONFIGURATION
// ==================================

const int SENSOR_PIN = 36;  // VP pin (GPIO 36)

const int DRY_ADC_VALUE = 4095;
const int WET_ADC_VALUE = 1276;

const unsigned long SEND_INTERVAL = 500;

unsigned long lastSendTime = 0;


// ==================================
// READ SOIL MOISTURE
// ==================================

float readMoisture() {

  long sum = 0;

  for (int i = 0; i < 3; i++) {
    sum += analogRead(SENSOR_PIN);
    delay(5);
  }

  int rawValue = sum / 3;

  float moisture =
    (float)(DRY_ADC_VALUE - rawValue) /
    (DRY_ADC_VALUE - WET_ADC_VALUE) * 100.0;

  moisture = constrain(moisture, 0, 100);

  Serial.print("Raw: ");
  Serial.print(rawValue);

  Serial.print(" | Moisture: ");
  Serial.print(moisture, 1);
  Serial.println("%");

  return moisture;
}


// ==================================
// SEND DATA TO BACKEND
// ==================================

void sendData(float moisture) {

  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi disconnected. Reconnecting...");
    WiFi.reconnect();
    return;
  }

  WiFiClientSecure secureClient;
  secureClient.setInsecure();

  HTTPClient http;

  http.setConnectTimeout(5000);
  http.setTimeout(5000);

  if (!http.begin(secureClient, SERVER_URL)) {
    Serial.println("HTTP connection failed");
    return;
  }

  http.addHeader("Content-Type", "application/json");

  String payload =
    "{\"moisture\":" + String(moisture, 1) + "}";

  int responseCode = http.POST(payload);

  if (responseCode >= 200 && responseCode < 300) {
    Serial.print("Backend: SUCCESS | HTTP ");
    Serial.println(responseCode);
  } else {
    Serial.print("Backend: FAILED | HTTP ");
    Serial.println(responseCode);
  }

  http.end();
}


// ==================================
// SETUP
// ==================================

void setup() {

  Serial.begin(115200);

  analogReadResolution(12);
  pinMode(SENSOR_PIN, INPUT);

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.print("Connecting to WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(300);
    Serial.print(".");
  }

  Serial.println("\nWiFi Connected!");
  Serial.println("AgriSense AI Started");

  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}


// ==================================
// MAIN LOOP
// ==================================

void loop() {

  unsigned long currentTime = millis();

  if (currentTime - lastSendTime >= SEND_INTERVAL) {

    lastSendTime = currentTime;

    float moisture = readMoisture();

    sendData(moisture);
  }
}
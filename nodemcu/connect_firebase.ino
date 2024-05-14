#include <ESP8266WiFi.h>
// #include <FirebaseESP8266.h>
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
#include "time.h"
#include <SoftwareSerial.h>
#include <string.h>

#define SSID "Routing"
#define PASSWORD "grb080916c"
#define FIREBASE_API_KEY "AIzaSyDALiu3BdUQT8mHV43PJ_jr_2YnLAaLxdg"
#define FIREBASE_EMAIL "test@test.com"
#define FIREBASE_PASSWORD "12345678"
#define FIREBASE_DATABASE_URL "https://embbed-lab-final-project-default-rtdb.asia-southeast1.firebasedatabase.app"

//Define Firebase Data object
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

// Counter
FirebaseJson json;

unsigned long sendDataPrevMillis = 0;
unsigned long getDataPrevMillis = 0;
unsigned long timerDelay = 15000;
unsigned long getDelay = 5000;

float brightness;
float distance;

const char* ntpServer = "pool.ntp.org";

SoftwareSerial comm(D7, D8);

void initialUSBSerial() {
  // Start USB serial
}

void initialSTMSerial() {
  // Start communicate with STM32
}

unsigned long getTime() {
  time_t now;
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    return (0);
  }
  time(&now);
  return now;
}

void initialWifi() {
  // Connect wifi with ssid and password
  WiFi.begin(SSID, PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.println("Connecting Wifi...  ");
    // Serial.printf("Connection Status: %d\n", WiFi.status());
    delay(1000);
  }

  // Connected
  Serial.print("Wi-Fi connected.");
  Serial.print("IP Address : ");
  Serial.println(WiFi.localIP());
}

void initialTime() {
  // Start connect timestamp server
  configTime(0, 0, ntpServer);
}

void initialFirebase() {
  // Firebase client version
  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

  // Connect Firebase
  config.api_key = FIREBASE_API_KEY;
  config.database_url = FIREBASE_DATABASE_URL;

  // Assign the user sign in credentials
  auth.user.email = FIREBASE_EMAIL;
  auth.user.password = FIREBASE_PASSWORD;

  // Assign the callback function for the long running token generation task
  config.token_status_callback = tokenStatusCallback;

  // Begin with anonymous user
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void setup() {
  Serial.begin(115200);

  comm.begin(9600);
  pinMode(D7, INPUT);
  pinMode(D8, OUTPUT);

  pinMode(D0, OUTPUT);  //blink

  initialWifi();
  initialTime();
  initialFirebase();
}

void loop() {
  String data;

  if (comm.available()) {

    Serial.println("Connecting Comm ...");  

    data = comm.readStringUntil('x');
    Serial.println(data);
    comm.write('1');

    yield();

    if (Firebase.ready()) {
      Serial.println("In if");
      Serial.printf("Set json... %s\n", Firebase.RTDB.setString(&fbdo, "/sensor", data) ? "ok" : fbdo.errorReason().c_str());
    }
    else {
      Serial.println("In else");
    }
  }
  else {
    Serial.println("Not Com available");
  }

  delay(1000);
}

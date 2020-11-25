#include <ESP8266WiFi.h>        // Include the Wi-Fi library
#include <ESP8266WebServer.h>

const char* ssid     = "xxx";         // The SSID (name) of the Wi-Fi network you want to connect to
const char* password = "xxx";     // The password of the Wi-Fi network

ESP8266WebServer server(80);

void ouvre(){
  server.send(200, "text/html", "Ouverture");
  Serial.println("Ouverture");
  digitalWrite(2, HIGH);   // turn the GPIO2 high
  delay(1000);              // wait for a second
  digitalWrite(2, LOW);    // turn the GPIO2 low
  delay(1000);              // wait for a second
}
void ferme(){
  server.send(200, "text/html", "Fermeture");
  Serial.println("Fermeture");
  digitalWrite(0, HIGH);   // turn the GPIO0 high
  delay(1000);              // wait for a second
  digitalWrite(0, LOW);    // turn the GPIO0 high
  delay(1000);              // wait for a second
}

void setup() {
  pinMode(2, OUTPUT);
  pinMode(0, OUTPUT);
  Serial.begin(115200);         // Start the Serial communication to send messages to the computer
  delay(10);
  Serial.println('\n');
  
  WiFi.begin(ssid, password);             // Connect to the network
  Serial.print("Connecting to ");
  Serial.print(ssid); Serial.println(" ...");

  int i = 0;
  while (WiFi.status() != WL_CONNECTED) { // Wait for the Wi-Fi to connect
    delay(1000);
    Serial.print(++i); Serial.print(' ');
  }

  Serial.println('\n');
  Serial.println("Connection established!");  
  Serial.print("IP address:\t");
  Serial.println(WiFi.localIP());         // Send the IP address of the ESP8266 to the computer

  server.on("/ouverture/123Porte!", HTTP_GET, ouvre);
  server.on("/fermeture/123Porte!", HTTP_GET, ferme);
  server.begin();
}

void loop() {
  server.handleClient(); 
}

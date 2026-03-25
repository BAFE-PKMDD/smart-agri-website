export const MODULE_DATA = [
  {
    slug: "intro-arduino-ide",
    id: "I",
    title: "Introduction to Arduino IDE",
    subtitle: "Understand what the Arduino IDE is, what it is used for, and how to navigate its interface",
    tags: ["Arduino IDE", "Setup", "Fundamentals"],
    description:
      "Understand what the Arduino IDE is, what it is used for, and how to navigate its interface.",
    sections: [
      {
        heading: "Part I. Installation of Arduino IDE version 2.x.x",
        content: [
          "**Procedures:**",
          "1. Access the official Arduino website (https://www.arduino.cc/en/software/) and download the software installation package appropriate for your operating system (Windows or macOS).",
          "2. Once installed, launch the application by Double Clicking the Arduino IDE icon.",
          "3. Inspect the interface of the Arduino IDE.",
        ],
      },
      {
        heading: "a. Sketch Editor",
        images: ["mod1-1.png"],
        content: [
          "The main text area where you write your code (called a **Sketch**).",
          "Every sketch starts with two functions: **setup()** runs once when the board powers on, and **loop()** runs repeatedly after setup completes.",
        ],
      },
      {
        heading: "b. Toolbar",
        images: ["mod1-2.png"],
        content: [
          "Contains primary tools to **Verify** (compile) your code and **Upload** it to the board.",
          "The checkmark button compiles your sketch to check for errors, and the arrow button uploads the compiled code to the connected board.",
        ],
      },
      {
        heading: "c. Sidebar",
        images: ["mod1-3.png"],
        content: [
          "Provides access to the **Boards Manager**, **Library Manager**, and **Debug** tools.",
          "Use the Boards Manager to install board packages (e.g., ESP32 by Espressif Systems). The Library Manager lets you add pre-built libraries for sensors, displays, and communication protocols.",
        ],
      },
      {
        heading: "d. Output Console",
        images: ["mod1-4.png"],
        content: [
          "Displays status messages, compilation errors, and memory usage details.",
          "When you verify or upload a sketch, this panel shows the progress and any errors that need to be fixed before the code can run on your board.",
        ],
      },
    ],
  },
  {
    slug: "blink-led",
    id: "II",
    title: "Blinking an LED with ESP32",
    subtitle: "Configure the Arduino IDE, Wire your First Circuit, and Upload a Sketch",
    tags: ["LED", "Digital Output", "ESP32"],
    description:
      "Configure the Arduino IDE for the ESP32 board, write a basic sketch, and upload it to control an external LED.",
    sections: [
      {
        heading: "Part I. Understanding the Components",
        content: [
          "To build this circuit, you will need the following parts:",
          "- **ESP32 Development Board** (30 or 38 pins).",
          "- **LED (Light Emitting Diode):** Has a long leg (Anode/+) and a short leg (Cathode/-).",
          "- **220Ω Resistor:** Limits the current flowing to the LED to prevent it from burning out.",
          "- **Breadboard & Jumper Wires:** For making temporary connections.",
        ],
      },
      {
        heading: "Part II. Installing the ESP32 Board Package in Arduino IDE",
        images: ["board-manager.png"],
        content: [
          "**Procedures:**",
          "1. Click the **Board Manager** icon on the left sidebar (looks like a small circuit board).",
          "2. In the search bar, type **ESP32**.",
          "3. Find the entry titled **esp32 by Espressif Systems** and click **Install**. Wait for the progress bar to finish; this downloads the compilers and tools needed for the ESP32 chip.",
        ],
      },
      {
        heading: "Part III. Hardware Assembly (The Circuit)",
        images: ["led-circuit.png"],
        content: [
          "**Procedures:**",
          "1. Place the ESP32 board onto the breadboard.",
          "2. Connect the **short leg (Cathode)** of the LED to a **Ground (GND)** pin on the ESP32 using a jumper wire.",
          "3. Connect the **long leg (Anode)** of the LED to one end of the **220Ω resistor**.",
          "4. Connect the other end of the resistor to **GPIO 13** (labeled D13 or G13) on the ESP32.",
          "**Note:** We use a resistor because the ESP32 outputs 3.3V, which is high enough to damage a standard LED if connected directly.",
        ],
      },
      {
        heading: "Part IV. Writing the Blink Code",
        content: [
          "**Procedures:**",
          "1. Open your Arduino IDE.",
          "2. Connect your ESP32 board to your computer via a **USB-C data cable**.",
          "3. Select your board: Go to **Toolbar > Select Board > ESP32 DEV MODULE**.",
          "4. Clear any existing code in the editor and paste the following \"Blink\" script.",
        ],
        code: `// Define the LED pin
const int ledPin = 13;

void setup() {
  // Initialize the digital pin as an output
  pinMode(ledPin, OUTPUT);
}

void loop() {
  digitalWrite(ledPin, HIGH); // Turn the LED ON
  delay(1000);                // Wait for 1000 milliseconds (1 second)
  digitalWrite(ledPin, LOW);  // Turn the LED OFF (0V)
  delay(1000);                // Wait for 1 second
}`,
      },
      {
        heading: "Part V. Compiling and Uploading",
        content: [
          "**Procedures:**",
          "1. Click the **Upload** button (the right-pointing arrow) in the top toolbar.",
          '2. **The "Boot" Button Trick:** If you see a message saying `Connecting......._____......`, press and hold the **BOOT** button on your physical ESP32 board until the upload starts (you will see percentage numbers).',
          '3. Once the console displays "Done uploading," your external LED should begin to pulse.',
        ],
      },
    ],
  },
  {
    slug: "pwm",
    id: "III",
    title: "Pulse Width Modulation (PWM)",
    subtitle: "Controlling LED Brightness and Motor Speed",
    tags: ["PWM", "Analog"],
    description:
      "Controlling LED brightness and motor speed using PWM signals and analogWrite functions.",
    sections: [
      {
        heading: "Part I. The Concept of PWM",
        content: [
          "Digital pins are usually binary: they are either ON (3.3V) or OFF (GND). Pulse Width Modulation (PWM) is a technique where we flip the pin ON and OFF so fast that the connected device (like an LED) perceives it as a steady, intermediate voltage.",
          "**Duty Cycle:** The percentage of time the signal is \"HIGH\" vs. \"LOW\" during one cycle.",
          "- **0% Duty Cycle:** Always OFF (0V).",
          "- **50% Duty Cycle:** ON half the time (Simulates ~1.65V).",
          "- **100% Duty Cycle:** Always ON (3.3V).",
        ],
      },
      {
        heading: "Part II. Hardware Assembly",
        images: ["image44.png"],
        content: [
          "We will use the same setup as the LED module, but we will use a PWM-capable pin. On the ESP32, almost all pins can provide PWM signals.",
          "**Procedures:**",
          "1. Connect the Long leg (Anode) of an LED to a 220Ω resistor.",
          "2. Connect the other end of the resistor to **GPIO 5**.",
          "3. Connect the Short leg (Cathode) of the LED to GND.",
        ],
      },
      {
        heading: "Part III. The Implementation Code",
        code: `/*
 * Module III: Pulse Width Modulation (PWM)
 * Fading an LED in and out
 */
const int ledPin = 5; // The pin the LED is connected to

void setup() {
  // No special setup required for analogWrite on modern ESP32 cores
  pinMode(ledPin, OUTPUT);
}

void loop() {
  // 1. Fade IN: Gradually increase brightness from 0 to 255
  for (int brightness = 0; brightness <= 255; brightness++) {
    analogWrite(ledPin, brightness);
    delay(10); // Wait 10ms to make the fade visible
  }

  // 2. Fade OUT: Gradually decrease brightness from 255 to 0
  for (int brightness = 255; brightness >= 0; brightness--) {
    analogWrite(ledPin, brightness);
    delay(10);
  }
}`,
      },
      {
        heading: "Part IV. Execution & Observation",
        content: [
          "1. Upload the code to your ESP32.",
          '2. Observe the LED. It should "breathe"—slowly getting brighter and then slowly dimming.',
          "3. **Experiment:** Change the `delay(10)` to `delay(2)`. The LED will breathe much faster.",
        ],
      },
    ],
  },
  {
    slug: "ldr-light-sensor",
    id: "IV",
    title: "Ambient Light Monitoring with LDR",
    subtitle: "Voltage Dividers and Light-Dependent Resistor Calibration",
    tags: ["LDR", "Voltage Divider"],
    description:
      "Voltage dividers, Light-Dependent Resistor calibration, and analog input readings for light sensing.",
    sections: [
      {
        heading: "Part I. Understanding the Instrumentation",
        content: [
          "Microcontrollers cannot measure resistance directly; they can only measure voltage. Because an LDR changes its resistance based on light exposure (high resistance in the dark, low resistance in the light), we must pair it with a fixed resistor to create a **Voltage Divider**.",
          "**Components Required:**",
          "- ESP32 Development Board",
          "- LDR (Light Dependent Resistor / Photoresistor)",
          "- 10kΩ Resistor (Fixed resistor for the voltage divider)",
          "- Breadboard & Jumper Wires",
        ],
      },
      {
        heading: "Part II. Wiring the Components",
        images: ["image46.png"],
        content: [
          "1. Place the LDR on the breadboard.",
          "2. Connect one leg of the LDR to the **3.3V** pin on the ESP32.",
          "3. Connect the other leg of the LDR to a blank row on the breadboard.",
          "4. From that same row (the junction), connect one leg of the **10kΩ Resistor**.",
          "5. Connect the other leg of the 10kΩ Resistor to the **GND** pin.",
          "6. Connect a jumper wire from the junction to **Pin 34**.",
        ],
      },
      {
        heading: "Part III. The Sketch (Code)",
        content: [
          "The ESP32 has a 12-bit ADC, meaning it reads voltages and converts them into a numeric value between 0 (0 Volts) and 4095 (3.3 Volts).",
        ],
        code: `// Define the analog pin connected to the LDR voltage divider
const int ldrPin = 34;
int rawLightValue = 0;

void setup() {
  Serial.begin(115200);
  analogReadResolution(12);
  Serial.println("LDR Sensor Initialized...");
  delay(1000);
}

void loop() {
  rawLightValue = analogRead(ldrPin);
  int lightPercentage = map(rawLightValue, 0, 4095, 0, 100);

  Serial.print("Raw ADC Value: ");
  Serial.print(rawLightValue);
  Serial.print("   |   Estimated Light Level: ");
  Serial.print(lightPercentage);
  Serial.println("%");

  if (lightPercentage < 20) {
    Serial.println("--> ALERT: Low light condition detected! (< 20%)");
  } else if (lightPercentage > 85) {
    Serial.println("--> ALERT: High glare/brightness detected! (> 85%)");
  }

  delay(500);
}`,
      },
      {
        heading: "Part IV. Execution and Calibration",
        content: [
          "1. Verify and Upload the code to your ESP32.",
          "2. Open the Serial Monitor and set the baud rate to **115200**.",
          "3. Observe the raw ADC values and the calculated percentage.",
          "4. **Test the Sensor:** Cover the LDR completely with your finger to simulate total darkness. Then shine a smartphone flashlight directly onto the LDR.",
          "5. **Calibration:** If your lowest value is never 0 and your highest is never 4095, adjust the `map()` function in your code.",
          "6. (Optional) Go to **Tools > Serial Plotter** to view the light fluctuations as a real-time line graph.",
        ],
      },
    ],
  },
  {
    slug: "ultrasonic-sensor",
    id: "V",
    title: "Distance Measurement with HC-SR04",
    subtitle: "Ultrasonic Sensor Wiring and Distance Calculation",
    tags: ["Ultrasonic", "HC-SR04"],
    description:
      "Ultrasonic sensor wiring, trigger/echo timing, and distance calculation code for proximity detection.",
    sections: [
      {
        heading: "Part I. Understanding the HC-SR04 Sensor",
        content: [
          "The HC-SR04 works on the same principle as sonar or a bat's echolocation. It emits an ultrasonic pulse at 40kHz that travels through the air. If there is an object in its path, the pulse bounces back to the sensor.",
          "- **VCC:** Power (Usually 5V for best performance).",
          "- **Trig (Trigger):** Sends the ultrasonic pulse.",
          "- **Echo:** Receives the bounced pulse.",
          "- **GND:** Ground.",
        ],
      },
      {
        heading: "Part II. Hardware Wiring & Pin Selection",
        images: ["image48.png"],
        content: [
          "The HC-SR04 uses sound pulses to calculate distance. While the sensor usually needs 5V (Vin) to be accurate, its Echo pin sends back a 5V signal. The ESP32 pins are 3.3V, so using a simple voltage divider on the Echo pin is recommended.",
          "**Procedures:**",
          "1. **VCC:** Connect to the Vin pin (provides 5V from USB).",
          "2. **GND:** Connect to any GND pin.",
          "3. **Trig:** Connect to GPIO 5 (Output).",
          "4. **Echo (Voltage Divider Path):** Connect a 1kΩ resistor between the sensor's Echo pin and GPIO 18. Connect a 2kΩ resistor from GPIO 18 to a GND pin.",
        ],
      },
      {
        heading: "Part III. The Implementation Code",
        code: `/*
 * Module V: Ultrasonic Distance Sensor (HC-SR04)
 * Target Board: ESP32
 */
const int trigPin = 5;
const int echoPin = 18;

#define SOUND_SPEED 0.034 // Speed of sound in cm/uS
long duration;
float distanceCm;

void setup() {
  Serial.begin(115200);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  distanceCm = duration * SOUND_SPEED / 2;

  if (duration == 0) {
    Serial.println("Warning: No pulse received. Check wiring!");
  } else {
    Serial.print("Distance: ");
    Serial.print(distanceCm);
    Serial.println(" cm");
  }

  delay(500);
}`,
      },
      {
        heading: "Part IV. Execution",
        content: [
          "1. **Select Port:** Go to Tools > Port and ensure your ESP32 is selected.",
          '2. **Upload:** Click the Upload button. If you see `Connecting.......`, press and hold the BOOT button.',
          "3. **Monitor:** Open the Serial Monitor and set baud rate to **115200**.",
        ],
      },
    ],
  },
  {
    slug: "potentiometer",
    id: "VI",
    title: "Analog Input with Potentiometer",
    subtitle: "Reading Variable Voltage and Real-Time Monitoring",
    tags: ["Potentiometer", "Analog Input"],
    description:
      "Reading variable resistance values, mapping analog inputs, and real-time serial monitoring.",
    sections: [
      {
        heading: "Part I. Understanding the Potentiometer",
        content: [
          "A potentiometer (or \"pot\") is a three-terminal variable resistor. As you rotate the knob, the resistance changes, which varies the voltage output on the middle pin.",
          "- **Pin 1:** Ground (GND).",
          "- **Pin 2 (Wiper):** The signal pin that outputs a voltage between 0V and 3.3V.",
          "- **Pin 3:** Power (VCC - 3.3V).",
        ],
      },
      {
        heading: "Part II. Hardware Assembly",
        images: ["image45.png"],
        content: [
          "**Crucial Note:** Unlike the Arduino Uno (10-bit), the ESP32 has a 12-bit ADC. This means it converts the voltage into a range from **0 to 4095**.",
          "1. Connect the left pin of the pot to **GND**.",
          "2. Connect the right pin of the pot to **3V3**.",
          "3. Connect the middle pin (Wiper) to **GPIO 34**.",
          "Note: GPIO 34 is an \"Input Only\" pin, making it ideal for sensors and pots.",
        ],
      },
      {
        heading: "Part III. The Implementation Code",
        code: `/*
 * Module VI: Potentiometer & ADC
 * Target Board: ESP32
 */
const int potPin = 34;
int potValue = 0;

void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("Potentiometer Reading Started...");
}

void loop() {
  potValue = analogRead(potPin);
  float voltage = (potValue / 4095.0) * 3.3;

  Serial.print("Raw Value: ");
  Serial.print(potValue);
  Serial.print(" | Voltage: ");
  Serial.print(voltage);
  Serial.println("V");
  delay(100);
}`,
      },
      {
        heading: "Part IV. Execution & Monitoring",
        content: [
          "1. Upload the code to your ESP32.",
          "2. Open the Serial Monitor at **115200** baud.",
          "3. Turn the knob. You will see the numbers climb as you turn it toward 3.3V and drop toward GND.",
          "4. **Try the Serial Plotter:** Go to **Tools > Serial Plotter**. As you turn the knob, you will see a visual wave!",
        ],
      },
    ],
  },
  {
    slug: "climate-monitoring",
    id: "VII",
    title: "Climate Monitoring with DHT22",
    subtitle: "Temperature and Humidity Environmental Monitoring",
    tags: ["DHT22", "Temperature", "Humidity"],
    description:
      "DHT22 library installation and hardware assembly for temperature and humidity environmental monitoring.",
    sections: [
      {
        heading: "Part I. Understanding the DHT22 Sensor",
        content: [
          "The DHT22 is a high-accuracy digital sensor. Unlike simple analog sensors, it sends data in digital packets, requiring a specific timing protocol.",
          "- **Temperature Range:** -40 to 80°C (±0.5°C accuracy).",
          "- **Humidity Range:** 0 to 100% RH (±2-5% accuracy).",
          "- **Operating Voltage:** 3.3V to 5V (Perfect for ESP32's 3.3V logic).",
        ],
      },
      {
        heading: "Part II. Library Installation",
        images: ["mod7-inst-1.png", "mod7-inst-2.png"],
        content: [
          "To talk to the sensor, we need specific instructions (libraries).",
          "**Procedures:**",
          "1. In Arduino IDE, click the **Library Manager** icon on the left sidebar (shortcut: `Ctrl+Shift+I`).",
          '2. Search for **"DHT sensor library"**. Find the one by **Adafruit** and click **Install**.',
          '3. A popup may ask to install "Dependencies" (like *Adafruit Unified Sensor*). Click **Install All**.',
        ],
      },
      {
        heading: "Part III. Hardware Assembly",
        images: ["mod7-board.png"],
        content: [
          "1. Connect the **VCC** pin (Pin 1) of the DHT22 to **3V3** on the ESP32.",
          "2. Connect the **DATA** pin (Pin 2) to **GPIO 4** on the ESP32.",
          "3. Connect a **10kΩ pull-up resistor** between the DATA pin and VCC.",
          "4. Skip Pin 3 (it is unused).",
          "5. Connect the **GND** pin (Pin 4) to a **GND** pin on the ESP32.",
        ],
      },
      {
        heading: "Part IV. The Implementation Code",
        code: `#include "DHT.h"

#define DHTPIN 4      // GPIO pin connected to the DHT22 Data pin
#define DHTTYPE DHT22 // Specify the exact sensor model

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  Serial.println(F("DHT22 System Initializing..."));
  dht.begin();
}

void loop() {
  delay(2000);
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if (isnan(h) || isnan(t)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  Serial.print(F("Humidity: "));
  Serial.print(h);
  Serial.print(F("%  |  Temperature: "));
  Serial.print(t);
  Serial.println(F("°C"));
}`,
      },
      {
        heading: "Part V. Execution & Monitoring",
        content: [
          "1. Upload the code to your ESP32.",
          "2. Go to **Tools > Serial Monitor**.",
          "3. **Crucial:** Set Baud Rate to **115200**. If set to 9600, you will see garbage text.",
        ],
      },
    ],
  },
  {
    slug: "motor-driver",
    id: "VIII",
    title: "Motor Control with L298N Driver",
    subtitle: "L298N Motor Driver Assembly and DC Motor Control",
    tags: ["L298N", "Motor Driver", "Robotics"],
    description:
      "L298N Motor Driver assembly, dual motor execution, speed control, and direction logic for mobile platforms.",
    sections: [
      {
        heading: "Part I. Understanding the Power Dynamics",
        content: [
          "The ESP32 cannot power a motor directly. Relying on USB alone can cause voltage drops that reset the controller.",
          "**The Fix:** We use the HW-131 Power Supply for a stable 5V power hub.",
          "- **Input:** HW-131 powered via DC barrel jack from 7.4V battery pack.",
          "- **Output Rails:** Independent power rails to the breadboard.",
          "- **Jumpers:** Set to 5V for ESP32's Vin pin and L298N's logic.",
        ],
      },
      {
        heading: "Part II. Hardware Assembly & Common Ground",
        images: ["image34.png"],
        content: [
          "**Crucial Safety Note:** You must connect the grounds (GND) of all components together.",
          "**1. Power Supply Setup (HW-131):**",
          "- Plug the HW-131 into the end of your breadboard.",
          "- Set yellow jumpers to **5V**.",
          "- Connect 7.4V battery to HW-131 DC jack.",
          "**2. ESP32 Connection:**",
          "- Connect Vin to breadboard (+) rail.",
          "- Connect GND to breadboard (-) rail.",
          "**3. Motor Driver (L298N) Connections:**",
          "- Connect motors to OUT1/OUT2 (Left) and OUT3/OUT4 (Right).",
          "- Connect 12V terminal to (+) rail and GND to (-) rail.",
          "- Remove jumper caps on ENA and ENB.",
          "- ENA → GPIO 32, ENB → GPIO 33.",
          "- IN1 → GPIO 26, IN2 → GPIO 27, IN3 → GPIO 14, IN4 → GPIO 12.",
        ],
      },
      {
        heading: "Part III. The Implementation Code",
        code: `/*
 * Module VIII: L298N Motor Control with HW-131
 * Target Board: ESP32
 */
const int motor1Pin1 = 27; // IN1
const int motor1Pin2 = 26; // IN2
const int enable1Pin = 14; // ENA (PWM Speed Control)

void setup() {
  pinMode(motor1Pin1, OUTPUT);
  pinMode(motor1Pin2, OUTPUT);
  pinMode(enable1Pin, OUTPUT);
  Serial.begin(115200);
  Serial.println("Motor Control Initialized...");
}

void loop() {
  // Move FORWARD at maximum speed
  Serial.println("Moving Forward - Full Speed");
  digitalWrite(motor1Pin1, LOW);
  digitalWrite(motor1Pin2, HIGH);
  analogWrite(enable1Pin, 255);
  delay(2000);

  // STOP
  Serial.println("Motor Stopped");
  digitalWrite(motor1Pin1, LOW);
  digitalWrite(motor1Pin2, LOW);
  analogWrite(enable1Pin, 0);
  delay(1000);

  // Move BACKWARD at medium speed (~60%)
  Serial.println("Moving Backward - Medium Speed");
  digitalWrite(motor1Pin1, HIGH);
  digitalWrite(motor1Pin2, LOW);
  analogWrite(enable1Pin, 150);
  delay(2000);

  // STOP
  Serial.println("Motor Stopped");
  digitalWrite(motor1Pin1, LOW);
  digitalWrite(motor1Pin2, LOW);
  analogWrite(enable1Pin, 0);
  delay(2000);
}`,
      },
      {
        heading: "Part IV. Troubleshooting",
        content: [
          "- **Motor only hums or buzzes:** Speed value too low. Increase to 200+.",
          "- **ESP32 keeps restarting:** Motor drawing too much power. Ensure grounds are shared.",
          "- **Motor spins wrong direction:** Swap the motor wires on OUT1/OUT2.",
        ],
      },
    ],
  },
  {
    slug: "iot-web-server",
    id: "IX",
    title: "Wi-Fi Web Server (IoT Basics)",
    subtitle: "ESP32 Wi-Fi Web Server Hosting Live Sensor Data",
    tags: ["ESP32", "Wi-Fi", "IoT"],
    description:
      "Transform your ESP32 into a local web server. Learn how to connect the board to your home network and host a webpage that allows you to control an LED and monitor real-time sensor data from any smartphone or computer connected to the same Wi-Fi.",
    sections: [
      {
        heading: "Part I. Understanding Wi-Fi Modes",
        content: [
          "The ESP32 can operate in two primary Wi-Fi modes:",
          "- **Station Mode (STA):** The ESP32 connects to an existing Wi-Fi network (like your home router). This is what we will use.",
          "- **Access Point Mode (AP):** The ESP32 creates its own Wi-Fi network (like a hotspot) that you can connect to directly.",
        ],
      },
      {
        heading: "Part II. Hardware Assembly",
        content: [
          "Because we are adding a monitoring dashboard, we need a sensor to provide data. We will use the internal Blue LED for the control function and the LDR for the monitoring function.",
          "**Procedures:**",
          "1. Set up the LDR voltage divider circuit as you did in Module IV.",
          "2. Ensure the LDR junction is connected to **GPIO 34**.",
        ],
      },
      {
        heading: "Part III. Setting Up the Web Server Code",
        content: [
          "To create a web server, we use the built-in `WiFi.h` library. We will create a simple HTML interface with a live data dashboard and two buttons: one to turn the LED ON and one to turn it OFF.",
          "To make the dashboard update automatically, we include a `<meta http-equiv='refresh' content='5'>` HTML tag so the page refreshes every 5 seconds.",
          "**Procedures:**",
          "1. Open a new sketch.",
          "2. Replace `YOUR_SSID` and `YOUR_PASSWORD` with your actual Wi-Fi credentials.",
          "3. Copy and paste the code below:",
        ],
        code: `#include <WiFi.h>

// 1. Replace with your network credentials
const char* ssid     = "YOUR_SSID";
const char* password = "YOUR_PASSWORD";

// 2. Set web server port number to 80
WiFiServer server(80);

// 3. Variable to store the HTTP request
String header;

// 4. Assign output and input pins
const int outputPin = 2; // Using the internal Blue LED
const int ldrPin = 34;   // LDR Sensor pin for the dashboard

void setup() {
  Serial.begin(115200);
  pinMode(outputPin, OUTPUT);
  digitalWrite(outputPin, LOW);

  // Connect to Wi-Fi network
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  // Print local IP address and start web server
  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  server.begin();
}

void loop() {
  WiFiClient client = server.available();   // Listen for incoming clients

  if (client) {                             // If a new client connects,
    Serial.println("New Client.");
    String currentLine = "";
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        header += c;
        if (c == '\\n') {
          if (currentLine.length() == 0) {
            // HTTP headers always start with a response code
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:text/html");
            client.println("Connection: close");
            client.println();
            
            // 5. Check which button was pressed
            if (header.indexOf("GET /LED/on") >= 0) {
              digitalWrite(outputPin, HIGH);
            } else if (header.indexOf("GET /LED/off") >= 0) {
              digitalWrite(outputPin, LOW);
            }
            
            // 6. Read Sensor Data
            int currentLightLevel = analogRead(ldrPin);

            // 7. Display the HTML web page
            client.println("<!DOCTYPE html><html>");
            client.println("<head><meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1\\">");
            
            // This line automatically refreshes the webpage every 5 seconds to update the sensor reading
            client.println("<meta http-equiv=\\"refresh\\" content=\\"5\\">");
            
            client.println("<style>html { font-family: Helvetica; text-align: center;}");
            client.println(".button { background-color: #4CAF50; border: none; color: white; padding: 16px 40px;");
            client.println("text-decoration: none; font-size: 30px; margin: 2px; cursor: pointer;}</style></head>");
            
            client.println("<body><h1>Smart Agri Dashboard</h1>");
            
            // Inject the sensor data into the HTML
            client.println("<h2>Environment Monitor</h2>");
            client.print("<p style=\\"font-size: 24px;\\">Current Light Level: <strong>");
            client.print(currentLightLevel);
            client.println("</strong> / 4095</p><hr>");

            // Inject the Control Buttons
            client.println("<h2>Equipment Control</h2>");
            client.println("<p><a href=\\"/LED/on\\"><button class=\\"button\\">ON</button></a></p>");
            client.println("<p><a href=\\"/LED/off\\"><button class=\\"button\\" style=\\"background-color:red\\">OFF</button></a></p>");
            client.println("</body></html>");
            
            client.println(); // The HTTP response ends with another blank line
            break;
          } else {
            currentLine = "";
          }
        } else if (c != '\\r') {
          currentLine += c;
        }
      }
    }
    header = "";
    client.stop(); // Close the connection
    Serial.println("Client disconnected.");
  }
}`,
      },
      {
        heading: "Part IV. Execution and Accessing the Server",
        content: [
          "**Procedures:**",
          "1. Upload the code to your ESP32.",
          "2. Open the Serial Monitor (115200 baud).",
          '3. Wait for the message: "IP address: 192.168.x.x". Write this number down.',
          "4. Open a web browser on your phone or laptop (ensure it is on the same Wi-Fi).",
          "5. Type the IP address into the URL bar and hit Enter.",
          "6. Cover the LDR with your hand; you will see the number on the dashboard drop the next time the page auto-refreshes.",
        ],
      },
      {
        heading: "Part V. Troubleshooting",
        content: [
          "- **Serial Monitor shows only dots (......):** Your SSID or Password might be wrong, or your router is blocking the connection.",
          "- **Webpage won't load:** Make sure your phone/laptop is on the exact same Wi-Fi network as the ESP32.",
          "- **IP Address is 0.0.0.0:** The board didn't get an IP from the router. Try resetting the ESP32 using the EN button.",
        ],
      },
    ],
  },
  {
    slug: "smtp-alerts",
    id: "X",
    title: "Automated Sensor Alerts via SMTP",
    subtitle: "ESP32 Email Notifications When Sensor Thresholds are Exceeded",
    tags: ["SMTP", "Email", "Alerts"],
    description:
      "Program the ESP32 to act as an SMTP (Simple Mail Transfer Protocol) client that automatically sends a secure email notification when a hardware sensor (LDR) detects a drastic change in ambient light.",
    sections: [
      {
        heading: "Part I. Generating a Google App Password",
        content: [
          "To allow the ESP32 to send emails through Google's servers securely without exposing your main password, we must generate a dedicated App Password.",
          "**Procedures:**",
          "1. Log in to the Google account you wish to send emails from and navigate to **Manage your Google Account**.",
          "2. Go to the **Security** tab on the left sidebar.",
          "3. Ensure that **2-Step Verification (2SV)** is enabled.",
          "4. Under the \"How you sign in to Google\" section, select **2-Step Verification** or access the link: https://myaccount.google.com/signinoptions/two-step-verification",
          "5. Scroll to the bottom of the page and select **App passwords** or access the link: https://myaccount.google.com/apppasswords",
          "6. Provide a custom name for the application (e.g., \"ESP32_Instrumentation_Node\") and click **Create**.",
          "7. A 16-character passcode will appear in a yellow box. Copy this exact 16-character string. You will paste this into your Arduino code.",
        ],
      },
      {
        heading: "Part II. Assembling the LDR Hardware Circuit",
        content: [
          "Follow the instruction in Module IV (LDR).",
        ],
      },
      {
        heading: "Part III. Installing the Required Library",
        content: [
          "Standard Arduino libraries cannot handle the complex SSL/TLS encryption required by Google's SMTP servers. We will use a specialized library.",
          "**Procedures:**",
          "1. Open the Arduino IDE.",
          "2. Open the **Library Manager** from the Sidebar (or navigate to Sketch > Include Library > Manage Libraries).",
          '3. In the search bar, type **ESP Mail Client**.',
          "4. Locate the library authored by **Mobizt** and click Install.",
        ],
      },
      {
        heading: "Part IV. The Sketch (Code)",
        content: [
          "**Procedures:**",
          "1. Copy the code below into your Sketch Editor.",
          "2. Replace `YOUR_WIFI_SSID` and `YOUR_WIFI_PASSWORD` with your local network credentials.",
          "3. Replace `SENDER_EMAIL@domain.com` and the `APP_PASSWORD` with the credentials generated in Part I.",
          "4. Replace `RECIPIENT_EMAIL@domain.com` with the address where you want to receive the alert.",
        ],
        code: `#include <Arduino.h>
#include <WiFi.h>
#include <ESP_Mail_Client.h>

#define WIFI_SSID "YOUR_WIFI_SSID"
#define WIFI_PASSWORD "YOUR_WIFI_PASSWORD"

#define SMTP_HOST "smtp.gmail.com"
#define SMTP_PORT 465 // Secure SSL/TLS port

// The email account sending the alert
#define AUTHOR_EMAIL "SENDER_EMAIL@domain.com"
#define AUTHOR_PASSWORD "YOUR_16_CHAR_APP_PASSWORD"

// The email account receiving the alert
#define RECIPIENT_EMAIL "RECIPIENT_EMAIL@domain.com"

SMTPSession smtp;
const int ldrPin = 34; // Analog pin connected to the LDR voltage divider
bool alertSent = false;

void setup() {
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println("\\nConnected with IP: ");
  Serial.println(WiFi.localIP());

  // Enable debugging to see the SMTP communication in the Serial Monitor
  smtp.debug(1);
}

void loop() {
  int ldrValue = analogRead(ldrPin);
  
  // Trigger threshold: If exposed to bright light
  if (ldrValue > 3000 && !alertSent) {
    Serial.println("High light threshold exceeded! Sending alert...");
    sendEmailAlert(ldrValue);
    alertSent = true; // Set flag so it doesn't spam your inbox
  }
  
  // Reset the flag once the enclosure is closed / it gets dark again
  if (ldrValue < 2000) {
    alertSent = false;
  }
  
  delay(1000); 
}

void sendEmailAlert(int currentReading) {
  ESP_Mail_Session session;
  session.server.host_name = SMTP_HOST;
  session.server.port = SMTP_PORT;
  session.login.email = AUTHOR_EMAIL;
  session.login.password = AUTHOR_PASSWORD;
  session.login.user_domain = "";

  SMTP_Message message;
  message.sender.name = "ESP32 Instrumentation Node";
  message.sender.email = AUTHOR_EMAIL;
  message.subject = "CRITICAL: Light Threshold Alert";
  message.addRecipient("Admin", RECIPIENT_EMAIL);

  // Construct the email body
  String emailBody = "Warning! The instrumentation sensor detected a high light event.\\n\\n";
  emailBody += "Current LDR Reading: " + String(currentReading) + " / 4095\\n";
  emailBody += "Please check the equipment immediately.";
  
  message.text.content = emailBody.c_str();

  if (!smtp.connect(&session)) return;
  if (!MailClient.sendMail(&smtp, &message)) {
    Serial.println("Error sending Email, " + smtp.errorReason());
  } else {
    Serial.println("Email sent successfully!");
  }
}`,
      },
      {
        heading: "Part V. Execution and Accessing the Results",
        content: [
          "**Procedures:**",
          "1. Upload the code to your ESP32.",
          "2. Open the Serial Monitor (115200 baud).",
          "3. Wait for the message confirming the Wi-Fi connection.",
          "4. **Trigger the sensor:** Shine a bright flashlight directly onto the LDR so the analog reading spikes above 3000.",
          "5. Watch the Serial Monitor. You will see the ESP32 negotiate the SSL handshake with Google's servers.",
          '6. Look for the "Email sent successfully!" message. Check your receiving inbox to view the automated alert.',
          "7. Cover the LDR with your hand to drop the reading below 2000, resetting the system for the next alert.",
        ],
      },
      {
        heading: "Part VI. Troubleshooting",
        content: [
          "- **LDR Value is Always 0 or 4095:** Check your wiring. Ensure the 10k resistor is properly grounded and the junction wire is securely connected to Pin 34.",
          "- **Error 535 (Authentication Failed):** Double-check that your 16-character App Password has no spaces in the code. Ensure you are using the exact email address associated with that App Password.",
          "- **Failed to connect to server / Connection Refused:** Check if your local network or firewall is blocking outbound traffic on port 465.",
          "- **Serial Monitor shows only dots (......):** Your SSID or Password might be wrong, or your access point is offline. Ensure the ESP32 is within range of your Wi-Fi router.",
        ],
      },
    ],
  },
  {
    slug: "hw-131-power-supply",
    id: "★",
    title: "Final Output",
    subtitle: "Breadboard Power Regulation for ESP32 Projects",
    tags: ["Power", "HW-131", "Safety"],
    description:
      "Breadboard power regulation with HW-131 — setting 3.3V/5V outputs, safe powering of ESP32 and peripherals.",
    sections: [
      {
        heading: "What is HW-131?",
        images: ["image2.png"],
        content: [
          "The HW-131 is a breadboard power regulator that sits directly on the power rails of your breadboard.",
          "- **Input:** Power via 12V DC barrel jack or USB cable.",
          "- **Output:** Two independent sets of pins, settable to 5V or 3.3V using yellow jumpers.",
          "- **Switch:** Physical ON/OFF button for safety.",
        ],
      },
      {
        heading: "How to Connect for ESP32 Projects",
        content: [
          "1. **Mounting:** Plug the module into the very end of your breadboard so the pins align with the + and - rails.",
          "2. **Setting the Jumpers:** Left Side → 3.3V (for ESP32 and LDR). Right Side → 5V (for L298N logic or Ultrasonic sensor).",
          "3. **Wiring the ESP32:** Connect breadboard (+) rail to Vin or 3V3. Connect breadboard (-) rail to GND.",
        ],
      },
    ],
  },
];

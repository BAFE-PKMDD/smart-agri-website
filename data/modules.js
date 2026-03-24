export const MODULE_DATA = [
  {
    slug: "digital-toolkit",
    id: "0",
    title: "The Digital Toolkit",
    subtitle: "Prompt Engineering, Analog vs Digital, and Multimeters",
    tags: ["Fundamentals", "Multimeter"],
    description:
      "Prompt Engineering for hardware, understanding Analog vs Digital signals, and Multimeter fundamentals.",
    sections: [
      {
        heading: "What is a Multimeter?",
        content: [
          "It is one tool that does three main jobs:",
          "**Voltmeter (V):** Measures \"pressure.\" Is your 7.4V battery actually full?",
          "**Ohmmeter (Ohms):** Measures \"resistance.\" Is your 10k resistor the right one?",
          "**Continuity:** Measures \"connection.\" Is there a broken wire or a \"short\" in your breadboard?",
        ],
      },
      {
        heading: "The Big Difference: Analog vs. Digital",
        images: ["image22.png", "image18.png"],
        table: {
          headers: ["Feature", "Analog (Old School)", "Digital (Modern)"],
          rows: [
            [
              "Reading it",
              "You watch a needle move.",
              "You read a number on a screen.",
            ],
            [
              "Accuracy",
              'Hard to be exact; you have to "guess" between lines.',
              'Very exact; shows you "3.29V" clearly.',
            ],
            [
              "Ease of Use",
              'You must pick the right "range" or the needle might break.',
              "Most are Auto-Ranging—the tool finds the range for you.",
            ],
            [
              "Best For",
              "Watching values that fluctuate rapidly (wobbling needle).",
              "Everything else! Checking sensors, batteries, and code.",
            ],
          ],
        },
      },
      {
        heading: "What is HW-131?",
        images: ["image2.png"],
        content: [
          "The HW-131 is a breadboard power regulator that sits directly on the power rails of your breadboard.",
          "**Input:** You can power it via a 12V DC barrel jack or a USB cable.",
          "**Output:** It has two independent sets of pins that can be set to 5V or 3.3V using yellow jumpers.",
          "**Switch:** It has a physical ON/OFF button, which is much safer for participants than constantly unplugging wires.",
        ],
      },
      {
        heading: "How to Connect HW-131 for Your ESP32 Project",
        content: [
          "**Mounting:** Plug the module into the very end of your breadboard so the pins align with the + and - rails.",
          "**Setting the Jumpers:** Set the Left Side jumper to 3.3V to power your ESP32 and LDR. Set the Right Side jumper to 5V if you need to power the L298N logic or the Ultrasonic sensor.",
          "**Wiring the ESP32:** Connect the breadboard's (+) rail to the Vin or 3V3 pin of the ESP32. Connect the breadboard's (-) rail to a GND pin.",
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
      "Setting up an ESP32 Wi-Fi Web Server to host live sensor data accessible from any device on the network.",
    sections: [
      {
        heading: "Part I. Understanding Wi-Fi Modes",
        content: [
          "The ESP32 can operate in two primary Wi-Fi modes:",
          "- **Station Mode (STA):** The ESP32 connects to an existing Wi-Fi network (like your router). This is what we will use.",
          "- **Access Point Mode (AP):** The ESP32 creates its own Wi-Fi network (like a hotspot).",
        ],
      },
      {
        heading: "Part II. Hardware Assembly",
        content: [
          "We will use the LDR for monitoring and the internal Blue LED for control.",
          "1. Set up the LDR voltage divider circuit as in Module IV.",
          "2. Ensure the LDR junction is connected to **GPIO 34**.",
        ],
      },
      {
        heading: "Part III. The Web Server Code",
        content: [
          "We use the built-in `WiFi.h` library. The dashboard auto-refreshes every 5 seconds using an HTML meta tag.",
          "**Replace YOUR_SSID and YOUR_PASSWORD** with your actual Wi-Fi credentials.",
        ],
        code: `#include <WiFi.h>

const char* ssid     = "YOUR_SSID";
const char* password = "YOUR_PASSWORD";

WiFiServer server(80);
String header;
const int outputPin = 2;  // Internal Blue LED
const int ldrPin = 34;    // LDR Sensor pin

void setup() {
  Serial.begin(115200);
  pinMode(outputPin, OUTPUT);
  digitalWrite(outputPin, LOW);

  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\\nWiFi connected.");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  server.begin();
}

void loop() {
  WiFiClient client = server.available();
  if (client) {
    // Handle HTTP requests, serve HTML dashboard
    // with LED control buttons and live LDR readings
    // (Full code in the training materials)
  }
}`,
      },
      {
        heading: "Part IV. Accessing the Dashboard",
        content: [
          "1. Upload the code to your ESP32.",
          "2. Open the Serial Monitor (115200 baud).",
          '3. Wait for the message: "IP address: 192.168.x.x". Write this number down.',
          "4. Open a web browser on your phone or laptop (same Wi-Fi).",
          "5. Type the IP address into the URL bar and hit Enter.",
          "6. Cover the LDR with your hand to see the dashboard values change.",
        ],
      },
      {
        heading: "Part V. Troubleshooting",
        content: [
          "- **Serial Monitor shows dots:** SSID or Password might be wrong.",
          "- **Webpage won't load:** Ensure phone/laptop is on the same Wi-Fi network.",
          "- **IP Address is 0.0.0.0:** Board didn't get an IP. Reset the ESP32 with the EN button.",
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
      "Programming the ESP32 to send secure email notifications when sensor thresholds are exceeded using Google SMTP.",
    sections: [
      {
        heading: "Part I. Generating a Google App Password",
        content: [
          "1. Log in to your Google account → **Manage your Google Account**.",
          "2. Go to the **Security** tab.",
          "3. Ensure **2-Step Verification** is enabled.",
          "4. Under 2-Step Verification, scroll to **App passwords**.",
          "5. Provide a name (e.g., \"ESP32_Instrumentation_Node\") and click **Create**.",
          "6. Copy the 16-character passcode.",
        ],
      },
      {
        heading: "Part II. Hardware Setup",
        content: [
          "Follow the LDR wiring from Module IV.",
        ],
      },
      {
        heading: "Part III. Installing the Library",
        content: [
          "1. Open the Arduino IDE.",
          "2. Open the **Library Manager**.",
          '3. Search for **"ESP Mail Client"**.',
          "4. Locate the library authored by **Mobizt** and click Install.",
        ],
      },
      {
        heading: "Part IV. The Code",
        code: `#include <Arduino.h>
#include <WiFi.h>
#include <ESP_Mail_Client.h>

#define WIFI_SSID "YOUR_WIFI_SSID"
#define WIFI_PASSWORD "YOUR_WIFI_PASSWORD"
#define SMTP_HOST "smtp.gmail.com"
#define SMTP_PORT 465

#define AUTHOR_EMAIL "SENDER_EMAIL@domain.com"
#define AUTHOR_PASSWORD "YOUR_16_CHAR_APP_PASSWORD"
#define RECIPIENT_EMAIL "RECIPIENT_EMAIL@domain.com"

SMTPSession smtp;
const int ldrPin = 34;
bool alertSent = false;

void setup() {
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println("\\nConnected with IP: ");
  Serial.println(WiFi.localIP());
  smtp.debug(1);
}

void loop() {
  int ldrValue = analogRead(ldrPin);
  if (ldrValue > 3000 && !alertSent) {
    Serial.println("High light threshold exceeded! Sending alert...");
    sendEmailAlert(ldrValue);
    alertSent = true;
  }
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

  SMTP_Message message;
  message.sender.name = "ESP32 Instrumentation Node";
  message.sender.email = AUTHOR_EMAIL;
  message.subject = "CRITICAL: Light Threshold Alert";
  message.addRecipient("Admin", RECIPIENT_EMAIL);

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
        heading: "Part V. Troubleshooting",
        content: [
          "- **LDR Value is Always 0 or 4095:** Check wiring. Ensure the 10k resistor is grounded properly.",
          "- **Error 535 (Authentication Failed):** Double-check App Password has no spaces.",
          "- **Failed to connect to server:** Check if firewall blocks port 465.",
          "- **Serial Monitor shows dots:** Check SSID/Password and Wi-Fi range.",
        ],
      },
    ],
  },
  {
    slug: "hw-131-power-supply",
    id: "★",
    title: "HW-131 Power Supply",
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

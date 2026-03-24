const MODULES = [
  {
    id: "0",
    title: "The Digital Toolkit",
    description:
      "Prompt Engineering for hardware, understanding Analog vs Digital signals, and Multimeter fundamentals.",
    tags: ["Fundamentals", "Multimeter"],
  },
  {
    id: "I",
    title: "Arduino Boards & IDE Setup",
    description:
      "Introduction to microcontroller boards, Arduino IDE 2.x installation, and first sketch upload.",
    tags: ["Arduino", "Setup"],
  },
  {
    id: "II",
    title: "Blink LED",
    description:
      "Your first program — controlling an LED with digital output, understanding pin configurations and timing.",
    tags: ["LED", "Digital Output"],
  },
  {
    id: "III",
    title: "PWM — Pulse Width Modulation",
    description:
      "Controlling LED brightness and motor speed using PWM signals and analogWrite functions.",
    tags: ["PWM", "Analog"],
  },
  {
    id: "IV",
    title: "Light & Resistance (LDR)",
    description:
      "Voltage dividers, Light-Dependent Resistor calibration, and analog input readings for light sensing.",
    tags: ["LDR", "Voltage Divider"],
  },
  {
    id: "V",
    title: "Sonic Distance (HC-SR04)",
    description:
      "Ultrasonic sensor wiring, trigger/echo timing, and distance calculation code for proximity detection.",
    tags: ["Ultrasonic", "HC-SR04"],
  },
  {
    id: "VI",
    title: "Potentiometer Monitoring",
    description:
      "Reading variable resistance values, mapping analog inputs, and real-time serial monitoring.",
    tags: ["Potentiometer", "Analog Input"],
  },
  {
    id: "VII",
    title: "Climate Monitoring (DHT22)",
    description:
      "DHT22 library installation and hardware assembly for temperature and humidity environmental monitoring.",
    tags: ["DHT22", "Temperature", "Humidity"],
  },
  {
    id: "VIII",
    title: "The Drive System (L298N)",
    description:
      "L298N Motor Driver assembly, dual motor execution, speed control, and direction logic for mobile platforms.",
    tags: ["L298N", "Motor Driver", "Robotics"],
  },
  {
    id: "IX",
    title: "IoT Basics — ESP32 Web Server",
    description:
      "Setting up an ESP32 Wi-Fi Web Server to host live sensor data accessible from any device on the network.",
    tags: ["ESP32", "Wi-Fi", "IoT"],
  },
  {
    id: "X",
    title: "Automated Alerts via SMTP",
    description:
      "Programming the ESP32 to send secure email notifications when sensor thresholds are exceeded using Google SMTP.",
    tags: ["SMTP", "Email", "Alerts"],
  },
  {
    id: "★",
    title: "HW-131 Power Supply",
    description:
      "Breadboard power regulation with HW-131 — setting 3.3V/5V outputs, safe powering of ESP32 and peripherals.",
    tags: ["Power", "HW-131", "Safety"],
  },
];

export default function Modules() {
  return (
    <section className="section" id="modules">
      <div className="container">
        <div className="section__header">
          <span className="section__label">Training Modules</span>
          <h2 className="section__title">What You'll Learn</h2>
          <p className="section__subtitle">
            From basic electronics to IoT web servers and automated alerts —
            a progressive, hands-on curriculum designed for agricultural engineers.
          </p>
        </div>

        <div className="modules__grid">
          {MODULES.map((mod, i) => (
            <div
              key={mod.id}
              className={`module-card fade-in fade-in-delay-${(i % 4) + 1}`}
            >
              <div className="module-card__header">
                <span className="module-card__number">{mod.id}</span>
                <h3 className="module-card__title">{mod.title}</h3>
              </div>
              <p className="module-card__description">{mod.description}</p>
              <div className="module-card__tags">
                {mod.tags.map((tag) => (
                  <span key={tag} className="module-card__tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

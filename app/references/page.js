import Link from "next/link";
import Image from "next/image";
import LoginButton from "@/components/login-button";

export const metadata = {
  title: "Hardware References | BAFE Smart Agriculture",
  description:
    "Quick reference diagrams for the Breadboard layout and ESP32 Dev Kit V1 pinout used in the workshop.",
};

export default function ReferencesPage() {
  return (
    <div className="groups-page">
      <header className="groups-page__header">
        <div className="container">
          <div className="groups-page__header-row">
            <Link href="/" className="module-page__back">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Home
            </Link>
            <LoginButton />
          </div>
        </div>
      </header>

      <main className="groups-page__body">
        <div className="container">
          <div className="ref-page__intro">
            <h1 className="groups-page__title">Hardware References</h1>
            <p className="groups-page__subtitle">
              Quick reference diagrams for the key hardware components used
              throughout the workshop modules.
            </p>
          </div>

          {/* Breadboard Section */}
          <section className="ref-card">
            <div className="ref-card__header">
              <span className="ref-card__badge">Component</span>
              <h2 className="ref-card__title">Breadboard Layout</h2>
              <p className="ref-card__desc">
                A breadboard is a reusable platform for building temporary
                circuits without soldering. Understanding its internal
                connections is essential for all workshop modules.
              </p>
            </div>
            <div className="ref-card__img-wrap">
              <Image
                src="/breadboard.jpg"
                alt="Breadboard layout showing power rails and terminal strips"
                width={1200}
                height={400}
                className="ref-card__img"
                priority
              />
            </div>
            <div className="ref-card__info">
              <h3 className="ref-card__info-title">How It Works</h3>
              <ul className="ref-card__list">
                <li>
                  <strong>Power Rails (+ and −):</strong> The top and bottom
                  rows (marked with red and blue lines) run horizontally across
                  the entire board. Use these to distribute VCC and GND.
                </li>
                <li>
                  <strong>Terminal Strips:</strong> The center rows are connected
                  vertically in groups of 5 holes. Components placed in the same
                  vertical column are electrically connected.
                </li>
                <li>
                  <strong>Center Gap:</strong> The gap in the middle separates
                  the two halves, perfect for placing DIP ICs or the ESP32
                  across both sides.
                </li>
              </ul>
            </div>
          </section>

          {/* ESP32 Pinout Section */}
          <section className="ref-card">
            <div className="ref-card__header">
              <span className="ref-card__badge">Microcontroller</span>
              <h2 className="ref-card__title">ESP32 Dev Kit V1 Pinout</h2>
              <p className="ref-card__desc">
                The ESP32 Dev Kit V1 has 30 GPIO pins with multiple functions
                including ADC, DAC, Touch, SPI, I2C, and UART. This diagram
                shows every pin and its available functions.
              </p>
            </div>
            <div className="ref-card__img-wrap">
              <Image
                src="/esp32_pinout.jpg"
                alt="ESP32 Dev Kit V1 complete pinout diagram"
                width={1400}
                height={800}
                className="ref-card__img"
                priority
              />
            </div>
            <div className="ref-card__info">
              <h3 className="ref-card__info-title">Pin Categories</h3>
              <div className="ref-card__grid">
                <div className="ref-card__grid-item">
                  <h4>Power Pins</h4>
                  <p>
                    <strong>3V3</strong> — 3.3V output,{" "}
                    <strong>VIN</strong> — 5V input from USB,{" "}
                    <strong>GND</strong> — Ground (multiple pins)
                  </p>
                </div>
                <div className="ref-card__grid-item">
                  <h4>Input Only</h4>
                  <p>
                    <strong>GPIO 34, 35, 36, 39</strong> — These pins can only
                    read input (ADC). They cannot be used as outputs. Ideal for
                    sensors like LDR and potentiometer.
                  </p>
                </div>
                <div className="ref-card__grid-item">
                  <h4>ADC Channels</h4>
                  <p>
                    <strong>ADC1</strong> (GPIO 32–39) — Safe to use with
                    Wi-Fi. <strong>ADC2</strong> (GPIO 0–27) — Cannot be used
                    while Wi-Fi is active.
                  </p>
                </div>
                <div className="ref-card__grid-item">
                  <h4>Touch Pins</h4>
                  <p>
                    <strong>Touch0–Touch9</strong> — Capacitive touch sensing
                    on GPIO 4, 0, 2, 15, 13, 12, 14, 27, 33, 32.
                  </p>
                </div>
                <div className="ref-card__grid-item">
                  <h4>Communication</h4>
                  <p>
                    <strong>SPI:</strong> MOSI (23), MISO (19), SCK (18), SS
                    (5). <strong>I2C:</strong> SDA (21), SCL (22).{" "}
                    <strong>UART:</strong> TX (1), RX (3).
                  </p>
                </div>
                <div className="ref-card__grid-item">
                  <h4>Boot Pins (Caution)</h4>
                  <p>
                    <strong>GPIO 0, 2, 12, 15</strong> — These affect boot
                    behavior. Avoid connecting peripherals that pull these
                    pins HIGH/LOW during startup.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

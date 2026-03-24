"use client";

import { useState } from "react";

const SCHEDULE = [
  {
    day: "Day 1",
    date: "March 24",
    weekday: "Tuesday",
    theme: "Foundations",
    items: [
      {
        time: "8:00 AM – 12:00 NN",
        activity: "Arrival, Registration, and Billeting of the Participants",
        type: "ceremony",
      },
      {
        time: "12:00 NN – 1:00 PM",
        activity: "Lunch Break",
        type: "break",
      },
      {
        time: "1:00 PM – 1:30 PM",
        activity: "Expectation Setting and Participant Orientation",
        type: "session",
      },
      {
        time: "1:30 PM – 3:00 PM",
        activity: "Module I: Introduction",
        detail: "Prompt Engineering for hardware, Analog vs Digital, Multimeters, IDE 2.x installation",
        type: "module",
      },
      {
        time: "3:00 PM – 5:00 PM",
        activity: "Module II & III: First Light",
        detail: "Blinking LEDs and PWM (Pulse Width Modulation) for brightness control",
        type: "module",
      },
    ],
  },
  {
    day: "Day 2",
    date: "March 25",
    weekday: "Wednesday",
    theme: "Sensors & IoT",
    items: [
      {
        time: "8:00 AM – 8:30 AM",
        activity: "Recap of Day 1",
        type: "session",
      },
      {
        time: "8:30 AM – 10:30 AM",
        activity: "Module IV & VI: Light & Resistance",
        detail: "Voltage Dividers, LDR Calibration, and Potentiometer monitoring",
        type: "module",
      },
      {
        time: "10:30 AM – 12:00 NN",
        activity: "Module VII: Climate Monitoring",
        detail: "DHT22 Library installation and hardware assembly for Temp/Humidity",
        type: "module",
      },
      {
        time: "12:00 NN – 1:00 PM",
        activity: "Lunch Break",
        type: "break",
      },
      {
        time: "1:00 PM – 3:30 PM",
        activity: "Module V: Sonic Distance",
        detail: "HC-SR04 Ultrasonic sensor wiring and distance calculation code",
        type: "module",
      },
      {
        time: "3:30 PM – 5:00 PM",
        activity: "Module VIII: The Drive System",
        detail: "L298N Motor Driver assembly and dual motor execution",
        type: "module",
      },
    ],
  },
  {
    day: "Day 3",
    date: "March 26",
    weekday: "Thursday",
    theme: "Motors & Alerts",
    items: [
      {
        time: "8:00 AM – 8:15 AM",
        activity: "Recap of Day 2",
        type: "session",
      },
      {
        time: "8:15 AM – 11:00 AM",
        activity: "Module IX: IoT Basics",
        detail: "Setting up an ESP32 Wi-Fi Web Server to host sensor data",
        type: "module",
      },
      {
        time: "11:00 AM – 12:00 NN",
        activity: "Module X: Automated Alerts",
        detail: "Coding the LDR-triggered Email Alerts via SMTP",
        type: "module",
      },
      {
        time: "12:00 NN – 1:00 PM",
        activity: "Lunch Break",
        type: "break",
      },
      {
        time: "1:00 PM – 5:00 PM",
        activity: "Project Lab & Troubleshooting",
        detail: "Final system integration and code debugging for the presentation",
        type: "lab",
      },
    ],
  },
  {
    day: "Day 4",
    date: "March 27",
    weekday: "Friday",
    theme: "Assessment & Closing",
    items: [
      {
        time: "8:00 AM – 8:30 AM",
        activity: "Recap of Day 3",
        type: "session",
      },
      {
        time: "8:30 AM – 9:00 AM",
        activity: "Post-Training Assessment",
        detail: "Final Technical Post-Test and Evaluation",
        type: "session",
      },
      {
        time: "9:00 AM – 10:00 AM",
        activity: "Closing Program",
        detail: "Awarding of Certificates and Closing Remarks",
        type: "ceremony",
      },
      {
        time: "10:00 AM",
        activity: "Departure / Homebound",
        type: "break",
      },
    ],
  },
];

const TYPE_LABELS = {
  module: "Module",
  session: "Session",
  ceremony: "Event",
  break: "Break",
  lab: "Lab",
};

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(0);
  const current = SCHEDULE[activeDay];

  return (
    <section className="section section--alt" id="schedule">
      <div className="container">
        <div className="section__header">
          <span className="section__label">Program of Activities</span>
          <h2 className="section__title">4-Day Training Schedule</h2>
          <p className="section__subtitle">
            A structured progression from fundamentals to full project
            integration, with daily recaps and hands-on labs.
          </p>
        </div>

        {/* Day Tabs */}
        <div className="schedule-tabs fade-in">
          {SCHEDULE.map((day, i) => (
            <button
              key={i}
              className={`schedule-tab ${activeDay === i ? "schedule-tab--active" : ""}`}
              onClick={() => setActiveDay(i)}
              type="button"
            >
              <span className="schedule-tab__day">{day.day}</span>
              <span className="schedule-tab__date">{day.date}</span>
              <span className="schedule-tab__theme">{day.theme}</span>
            </button>
          ))}
        </div>

        {/* Active Day Content */}
        <div className="schedule-content fade-in">
          <div className="schedule-content__header">
            <div>
              <h3 className="schedule-content__title">
                {current.day} — {current.weekday}
              </h3>
              <p className="schedule-content__theme">
                Focus: {current.theme}
              </p>
            </div>
            <span className="schedule-content__date">{current.date}, 2026</span>
          </div>

          <div className="schedule-timeline">
            {current.items.map((item, j) => (
              <div
                key={`${activeDay}-${j}`}
                className={`timeline-item timeline-item--${item.type}`}
              >
                <div className="timeline-item__marker">
                  <span className="timeline-item__dot" />
                  {j < current.items.length - 1 && (
                    <span className="timeline-item__line" />
                  )}
                </div>
                <div className="timeline-item__content">
                  <span className="timeline-item__time">
                    <span className="timeline-item__label">
                      {TYPE_LABELS[item.type]}
                    </span>
                    {item.time}
                  </span>
                  <h4 className="timeline-item__activity">{item.activity}</h4>
                  {item.detail && (
                    <p className="timeline-item__detail">{item.detail}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const OUTCOMES = [
  {
    icon: "🔧",
    title: "Microcontroller Programming",
    text: "Develop and program basic microcontroller applications using Arduino for sensing, monitoring, and control tasks.",
  },
  {
    icon: "⚡",
    title: "Motor Control",
    text: "Control basic motors using microcontroller platforms and understand drive systems for mobile applications.",
  },
  {
    icon: "📡",
    title: "Serial & Wireless Communication",
    text: "Apply serial communication (wired or Bluetooth) to send and receive control commands between devices.",
  },
  {
    icon: "🔌",
    title: "Embedded Systems Integration",
    text: "Integrate input/output components — buttons, LEDs, motors, sensors — to create a functional embedded system.",
  },
  {
    icon: "💡",
    title: "Smart System Prototyping",
    text: "Conceptualize and outline a smart system prototype addressing practical needs in local agricultural contexts.",
  },
  {
    icon: "📋",
    title: "Documentation & Presentation",
    text: "Document the design process, wiring, program logic, and testing results in a clear and structured manner.",
  },
];

export default function Outcomes() {
  return (
    <section className="section section--green" id="outcomes">
      <div className="container">
        <div className="section__header">
          <span className="section__label">Expected Outcomes</span>
          <h2 className="section__title">What You'll Achieve</h2>
          <p className="section__subtitle">
            By the end of 4 days, participants will have built working
            prototypes and gained practical skills applicable to real-world
            agricultural challenges.
          </p>
        </div>

        <div className="outcomes__grid">
          {OUTCOMES.map((outcome, i) => (
            <div
              key={i}
              className={`outcome-card fade-in fade-in-delay-${(i % 4) + 1}`}
            >
              <div className="outcome-card__icon">{outcome.icon}</div>
              <h3 className="outcome-card__title">{outcome.title}</h3>
              <p className="outcome-card__text">{outcome.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

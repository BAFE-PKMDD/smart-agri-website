const OBJECTIVES = [
  "Enhance ABE competencies in foundational digital electronics — identification, function, and application of electronic components, sensors, actuators, and communication modules.",
  "Develop proficiency in designing and programming IoT solutions using Arduino and ESP32 for real-time environmental monitoring, data logging, and automated control.",
  "Introduce fundamental principles of robotics applicable to agriculture and fisheries, covering motor types and control mechanisms for automation.",
  "Foster the ability to conceptualize and prototype context-specific smart technology applications addressing challenges like resource inefficiency and low productivity.",
  "Facilitate the initial application of digital skills through guided development of monitoring, control, and basic robotic systems tailored to local agriculture.",
];

export default function About() {
  return (
    <section className="section section--alt" id="about">
      <div className="container">
        <div className="section__header">
          <span className="section__label">About the Training</span>
          <h2 className="section__title">
            Bridging Engineering and Agriculture
          </h2>
          <p className="section__subtitle">
            Strengthening ABE competencies in instrumentation, IoT, and
            robotics to develop practical, context-specific solutions for
            Philippine agriculture and fisheries.
          </p>
        </div>

        <div className="about__grid">
          <div className="about__text fade-in">
            <h3 className="about__heading">Rationale</h3>
            <p>
              Agricultural and Biosystems Engineers (ABEs) play a pivotal role
              in bridging engineering principles with agricultural and fishery
              applications. Strengthening their competencies in basic
              instrumentation and electronics, microcontroller programming,
              sensor and actuator integration, IoT system design, and
              introductory robotics is essential for developing practical,
              context-specific solutions.
            </p>
            <p>
              This project seeks to equip ABEs with the technical knowledge
              and hands-on skills necessary to innovate, prototype, and deploy
              smart technologies that address productivity constraints,
              resource inefficiencies, and labor challenges in Philippine
              agriculture and fisheries.
            </p>
            <p>
              The workshop will be conducted via a face-to-face arrangement,
              including lecture discussions, hands-on demonstrations, and the
              development of applications for robotics and IoT. Facilitated by
              BAFE staff as resource persons, with staff from the DA
              RFO-RAEDs as participants.
            </p>
          </div>

          <div className="fade-in fade-in-delay-2">
            <h3 className="about__heading">Key Objectives</h3>
            <ul className="objectives__list">
              {OBJECTIVES.map((obj, i) => (
                <li key={i} className="objectives__item">
                  <span className="objectives__number">{i + 1}</span>
                  <span className="objectives__text">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

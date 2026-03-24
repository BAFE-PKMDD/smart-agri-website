const ASSESSMENTS = [
  {
    type: "Pre-Test",
    icon: "📝",
    description:
      "Take this assessment before the training begins to help us gauge your current knowledge level in electronics and IoT.",
    timing: "Complete before Day 1",
    url: "https://docs.google.com/forms/d/e/1FAIpQLScB-NT1rRBktBR6q7RbX_a6lXAPu4WgHlASlZxCzScbyB34Ag/viewform",
    buttonLabel: "Start Pre-Test",
  },
  {
    type: "Post-Test",
    icon: "🎯",
    description:
      "Take this assessment after the training to measure your growth and validate the skills you've acquired throughout the workshop.",
    timing: "Complete on Day 4",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSc1y2zznW5EeVlM-O4VVu9vlKw9HSqmBLFpXaQ9bXOEt9VC-Q/viewform",
    buttonLabel: "Start Post-Test",
  },
];

export default function Assessments() {
  return (
    <section className="section section--alt" id="assessments">
      <div className="container">
        <div className="section__header">
          <span className="section__label">Assessments</span>
          <h2 className="section__title">Pre-Test &amp; Post-Test</h2>
          <p className="section__subtitle">
            Measure your knowledge before and after the training to track
            your learning progress throughout the 4-day workshop.
          </p>
        </div>

        <div className="assessments__grid">
          {ASSESSMENTS.map((item) => (
            <div key={item.type} className="assessment-card fade-in">
              <div className="assessment-card__icon">{item.icon}</div>
              <h3 className="assessment-card__type">{item.type}</h3>
              <p className="assessment-card__desc">{item.description}</p>
              <span className="assessment-card__timing">{item.timing}</span>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="assessment-card__btn"
              >
                {item.buttonLabel} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

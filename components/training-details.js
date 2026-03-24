import Image from "next/image";

const WHAT_TO_BRING = [
  "Personal laptop (Intel i5 or equivalent, 8GB+ RAM, 20GB+ free storage)",
  "Mouse with scroll wheel (recommended)",
  "Smart (Android) cell phone with free space for apps",
  "Headphone or headset to keep other sounds at bay",
  "Data subscription (a few GBs will do)",
  "Power bank for powering your projects, plus your charger",
  "Extension cord, a few meters length",
  "Personal medicines and supplements",
];

export default function TrainingDetails() {
  return (
    <section className="section" id="details">
      <div className="container">
        <div className="section__header">
          <span className="section__label">Training Information</span>
          <h2 className="section__title">Venue &amp; Preparation</h2>
          <p className="section__subtitle">
            Everything you need to know before attending the workshop.
          </p>
        </div>

        <div className="details__grid">
          <div className="fade-in">
            <Image
              src="/venue.jpg"
              alt="Citystate Asturias Hotel, Palawan"
              width={800}
              height={500}
              className="details__venue-img"
            />
            <p className="details__venue-caption">
              Citystate Asturias Hotel, Palawan — Training Venue
            </p>
          </div>

          <div className="details__info fade-in fade-in-delay-2">
            <h3>What to Bring</h3>
            <ul className="details__list">
              {WHAT_TO_BRING.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h3>Methodology</h3>
            <div className="details__methodology">
              <p>
                The workshop combines <strong>lecture discussions</strong> with{" "}
                <strong>hands-on demonstrations</strong> and the development
                of applications for robotics and IoT. Each participant will
                receive an Arduino starter package for practical exercises.
              </p>
              <p style={{ marginTop: "0.75rem" }}>
                At the end of the activity, each region will present the output
                of their developed application and its importance to the
                Agriculture Biosystems Engineering sector.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

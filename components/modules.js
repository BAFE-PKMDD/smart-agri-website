import Link from "next/link";
import { MODULE_DATA } from "@/data/modules";

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
          {MODULE_DATA.map((mod, i) => (
            <Link
              key={mod.id}
              href={`/modules/${mod.slug}`}
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
              <span className="module-card__cta">
                View Module →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

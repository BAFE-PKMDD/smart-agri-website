import Link from "next/link";
import Image from "next/image";
import LoginButton from "@/components/login-button";

export const metadata = {
  title: "Resource Speakers | BAFE Smart Agriculture",
  description:
    "Meet the resource speakers for the BAFE Instrumentation and Electronics Training on Arduino IDE using AI Assisted Tools.",
};

const SPEAKERS = [
  {
    name: "Rey Carlo T. Rotol",
    image: "/RP-ROTOL.png",
    position: "Electronics and Communication Equipment Technician IV",
    organization: "Bureau of Agricultural and Fisheries Engineering (BAFE)",
    division: "Information Systems and Digitalization Division (ISDD)",
    expertise: [
      "Electronics & Communication Systems",
      "ESP32 & Arduino Development",
      "IoT Sensor Integration",
      "Embedded Systems Design",
    ],
  },
  {
    name: "Charles Niño M. Purwel",
    image: "/RP-PURWEL.png",
    position: "Computer Maintenance Technologist III",
    organization: "Bureau of Agricultural and Fisheries Engineering (BAFE)",
    division: "Information Systems and Digitalization Division (ISDD)",
    expertise: [
      "Computer Hardware & Maintenance",
      "Network Infrastructure",
      "System Administration",
      "Technical Support & Troubleshooting",
    ],
  },
];

export default function SpeakersPage() {
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
          <div className="speakers-page__intro">
            <h1 className="groups-page__title">Resource Speakers</h1>
            <p className="groups-page__subtitle">
              Meet the trainers leading the BAFE Instrumentation and Electronics
              Training on Arduino IDE using AI Assisted Tools.
            </p>
          </div>

          <div className="speakers-grid">
            {SPEAKERS.map((speaker) => (
              <article key={speaker.name} className="speaker-card">
                <div className="speaker-card__banner">
                  <div className="speaker-card__avatar-wrap">
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      width={800}
                      height={450}
                      className="speaker-card__avatar"
                      priority
                    />
                  </div>
                </div>

                <div className="speaker-card__body">
                  <h2 className="speaker-card__name">{speaker.name}</h2>
                  <p className="speaker-card__position">{speaker.position}</p>

                  <div className="speaker-card__org">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    <span>{speaker.organization}</span>
                  </div>

                  <div className="speaker-card__org">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                    <span>{speaker.division}</span>
                  </div>

                  <div className="speaker-card__section">
                    <h3 className="speaker-card__section-title">
                      Areas of Expertise
                    </h3>
                    <ul className="speaker-card__tags">
                      {speaker.expertise.map((skill) => (
                        <li key={skill} className="speaker-card__tag">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Event Info */}
          <div className="speakers-event">
            <div className="speakers-event__icon">📍</div>
            <div>
              <p className="speakers-event__title">
                Instrumentation and Electronics Training
              </p>
              <p className="speakers-event__detail">
                March 24–27, 2026 • CityState Asturias Hotel, Puerto Princesa
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

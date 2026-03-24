import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__bg-pattern" />
      <div className="hero__inner">
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            March 24–27, 2026 • Palawan
          </div>

          <h1 className="hero__heading">
            <em>Instrumentation</em> and <em>Electronics</em> Training for
            Smart Agriculture
          </h1>

          <p className="hero__description">
            A 4-day hands-on workshop equipping Agricultural and Biosystems
            Engineers with IoT, microcontroller programming, and robotics
            skills for the digital transformation of Philippine agriculture.
          </p>

          <div className="hero__meta">
            <div className="hero__meta-item">
              <span className="hero__meta-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <div>
                <strong>4 Days</strong>
                <br />
                March 24–27, 2026
              </div>
            </div>

            <div className="hero__meta-item">
              <span className="hero__meta-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <div>
                <strong>Palawan</strong>
                <br />
                Citystate Asturias Hotel
              </div>
            </div>

            <div className="hero__meta-item">
              <span className="hero__meta-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                  <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
              </span>
              <div>
                <strong>50 Participants</strong>
                <br />
                ABEs Nationwide
              </div>
            </div>
          </div>

          <a href="#modules" className="hero__cta">
            Explore the Program
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        <div className="hero__visual">
          <div className="hero__logo-container">
            <div className="hero__logo-ring hero__logo-ring--outer" />
            <div className="hero__logo-ring hero__logo-ring--inner" />
            <Image
              src="/logo.png"
              alt="Smart Agriculture Training Logo"
              width={400}
              height={400}
              className="hero__logo-img"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

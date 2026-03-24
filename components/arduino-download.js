const DOWNLOADS = [
  {
    platform: "Windows",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
      </svg>
    ),
    links: [
      { label: "Windows 10 and newer, 64 bit", href: "https://www.arduino.cc/en/software/" },
    ],
  },
  {
    platform: "macOS",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
    links: [
      { label: "macOS (Intel / Apple Silicon)", href: "https://www.arduino.cc/en/software/" },
    ],
  },
  {
    platform: "Linux",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574-.07 2.252-.07h.002c.678 0 1.553.012 2.252.07 1.028.065 1.672.331 2.26.334.238.482.681.83 1.208.946.749.2 1.69-.004 2.616-.47.863-.465 1.964-.4 2.774-.6.405-.131.766-.267.94-.601.175-.34.142-.804-.106-1.484-.077-.242-.018-.571.04-.97.027-.136.055-.337.055-.536.004-.208-.042-.413-.132-.602-.206-.411-.551-.544-.864-.68-.312-.133-.598-.201-.797-.4a2.294 2.294 0 01-.663-.839.422.422 0 00-.11-.135c.123-.805-.009-1.657-.287-2.489-.589-1.771-1.831-3.47-2.716-4.521-.75-1.067-.974-1.928-1.05-3.02-.065-1.491 1.056-5.965-3.17-6.298A5.043 5.043 0 0012.504 0z" />
      </svg>
    ),
    links: [
      { label: "Linux (AppImage / ZIP)", href: "https://www.arduino.cc/en/software/" },
    ],
  },
];

const INSTALL_STEPS = [
  "Download the Arduino IDE for your operating system below.",
  "Run the installer and follow the on-screen instructions.",
  "Launch Arduino IDE — you are now ready for the workshop.",
];

export default function ArduinoDownload() {
  return (
    <section className="section section--alt" id="arduino-download">
      <div className="container">
        <div className="section__header">
          <span className="section__label">Software Setup</span>
          <h2 className="section__title">Download Arduino IDE</h2>
          <p className="section__subtitle">
            The Arduino IDE is the primary software used throughout this
            workshop. Please install it on your laptop before arriving.
          </p>
        </div>

        <div className="arduino-dl fade-in">
          <div className="arduino-dl__steps">
            <h3 className="arduino-dl__steps-title">Quick Setup</h3>
            <ol className="arduino-dl__steps-list">
              {INSTALL_STEPS.map((step, i) => (
                <li key={i}>
                  <span className="arduino-dl__step-num">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="arduino-dl__platforms">
            {DOWNLOADS.map((dl) => (
              <div key={dl.platform} className="arduino-dl__card">
                <div className="arduino-dl__card-icon">{dl.icon}</div>
                <h4 className="arduino-dl__card-platform">{dl.platform}</h4>
                {dl.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="arduino-dl__card-link"
                  >
                    {link.label}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                ))}
              </div>
            ))}
          </div>

          <a
            href="https://www.arduino.cc/en/software/"
            target="_blank"
            rel="noopener noreferrer"
            className="arduino-dl__main-btn"
          >
            Visit Arduino Downloads Page
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
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

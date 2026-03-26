"use client";

import Image from "next/image";
import Link from "next/link";

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatText(text) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, (_, code) => `<code>${escapeHtml(code)}</code>`);
}

export default function ModulePageContent({ module: mod, allModules }) {
  const currentIndex = allModules.findIndex((m) => m.slug === mod.slug);
  const prevModule = currentIndex > 0 ? allModules[currentIndex - 1] : null;
  const nextModule =
    currentIndex < allModules.length - 1 ? allModules[currentIndex + 1] : null;

  return (
    <div className="module-page">
      {/* Header Bar */}
      <header className="module-page__header">
        <div className="container">
          <Link href="/#modules" className="module-page__back">
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
            Back to Modules
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="module-page__hero">
        <div className="container">
          <span className="module-page__badge">Module {mod.id}</span>
          <h1 className="module-page__title">{mod.title}</h1>
          <p className="module-page__subtitle">{mod.subtitle}</p>
          <div className="module-page__tags">
            {mod.tags.map((tag) => (
              <span key={tag} className="module-card__tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="module-page__body">
        <div className="container">
          <div className="module-content">
            {mod.sections.map((section, i) => (
              <div key={i} className="module-section">
                <h2 className="module-section__heading">{section.heading}</h2>

                {section.images && section.images.length > 0 && (
                  <div className="module-section__images">
                    {section.images.map((img) => (
                      <div key={img} className="module-section__img-wrap">
                        <Image
                          src={`/images/modules/${img}`}
                          alt={`${section.heading} diagram`}
                          width={800}
                          height={500}
                          className="module-section__img"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {section.content &&
                  section.content.map((line, j) => {
                    if (line.startsWith("**") && line.endsWith("**")) {
                      return (
                        <p
                          key={j}
                          className="module-section__text module-section__text--strong"
                          dangerouslySetInnerHTML={{
                            __html: formatText(line),
                          }}
                        />
                      );
                    }
                    if (line.startsWith("- ")) {
                      return (
                        <div key={j} className="module-section__list-item">
                          <span className="module-section__bullet">•</span>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: formatText(line.slice(2)),
                            }}
                          />
                        </div>
                      );
                    }
                    if (/^\d+\./.test(line)) {
                      return (
                        <div key={j} className="module-section__step">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: formatText(line),
                            }}
                          />
                        </div>
                      );
                    }
                    return (
                      <p
                        key={j}
                        className="module-section__text"
                        dangerouslySetInnerHTML={{
                          __html: formatText(line),
                        }}
                      />
                    );
                  })}

                {section.table && (
                  <div className="module-section__table-wrap">
                    <table className="module-section__table">
                      <thead>
                        <tr>
                          {section.table.headers.map((h) => (
                            <th key={h}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, ri) => (
                          <tr key={ri}>
                            {row.map((cell, ci) => (
                              <td key={ci}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {section.code && (
                  <div className="module-section__code">
                    <div className="module-section__code-header">
                      <span>Arduino / C++</span>
                      <button
                        className="module-section__copy-btn"
                        onClick={() =>
                          navigator.clipboard.writeText(section.code)
                        }
                        type="button"
                      >
                        Copy
                      </button>
                    </div>
                    <pre>
                      <code
                        dangerouslySetInnerHTML={{
                          __html: escapeHtml(section.code),
                        }}
                      />
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation */}
          <nav className="module-nav">
            {prevModule ? (
              <Link
                href={`/modules/${prevModule.slug}`}
                className="module-nav__link module-nav__link--prev"
              >
                <span className="module-nav__label">← Previous</span>
                <span className="module-nav__name">
                  Module {prevModule.id}: {prevModule.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextModule ? (
              <Link
                href={`/modules/${nextModule.slug}`}
                className="module-nav__link module-nav__link--next"
              >
                <span className="module-nav__label">Next →</span>
                <span className="module-nav__name">
                  Module {nextModule.id}: {nextModule.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </div>
      </main>
    </div>
  );
}


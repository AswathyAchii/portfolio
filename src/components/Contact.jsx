import { useLanguage } from '../context/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  const c = t.contact

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">{c.label}</span>
          <h2 className="section-title">{c.title} <span>{c.highlight}</span></h2>
          <div className="section-line" />
        </div>

        <div className="contact-grid">
          <div className="reveal">
            <p className="contact-intro">{c.intro}</p>

            <div className="contact-items">
              <div className="contact-item">
                <div className="contact-item-icon">📧</div>
                <div>
                  <div className="contact-item-label">{c.emailLabel}</div>
                  <div className="contact-item-value">
                    <a href="mailto:aswathygireeshn@gmail.com">
                      aswathygireeshn@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">📱</div>
                <div>
                  <div className="contact-item-label">{c.phoneLabel}</div>
                  <div className="contact-item-value">
                    <a href="tel:+971569219887">+971 569 219 887</a>
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">🔗</div>
                <div>
                  <div className="contact-item-label">{c.linkedinLabel}</div>
                  <div className="contact-item-value">
                    <a
                      href="https://linkedin.com/in/aswathygireesh1"
                      target="_blank"
                      rel="noreferrer"
                    >
                      linkedin.com/in/aswathygireesh1
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">📍</div>
                <div>
                  <div className="contact-item-label">{c.locationLabel}</div>
                  <div className="contact-item-value">{c.locationValue}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-cta-box reveal reveal-delay-2">
            <h3>{c.ctaTitle} <span className="gradient-text">{c.ctaHighlight}</span></h3>
            <p>{c.ctaDesc}</p>
            <div className="contact-cta-actions">
              <a href="mailto:aswathygireeshn@gmail.com" className="btn btn-primary">
                {c.sendEmail}
              </a>
              <a
                href="https://linkedin.com/in/aswathygireesh1"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                {c.connectLinkedIn}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

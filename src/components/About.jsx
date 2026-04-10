import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-image-wrap reveal">
            <img
              src="profile.jpg"
              alt="Aswathy Gireesh"
              className="about-photo"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div className="about-photo-placeholder" style={{ display: 'none' }}>
              👩‍💻
            </div>
            <div className="about-badge">
              <div className="about-badge-num">4+</div>
              <div className="about-badge-label">{a.yearsLabel.split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}</div>
            </div>
          </div>

          <div className="about-content reveal reveal-delay-2">
            <div className="section-header" style={{ marginBottom: '1.5rem' }}>
              <span className="section-label">{a.label}</span>
              <h2 className="section-title">
                {a.title} <span>{a.highlight}</span> {a.suffix}
              </h2>
              <div className="section-line" />
            </div>

            <p>{a.bio1}</p>
            <p>
              {a.bio2}{' '}
              <strong style={{ color: 'var(--purple-light)' }}>Claude, Kiro, and Antigravity</strong>.
            </p>

            <div className="about-highlights">
              <div className="highlight-item">
                <span className="highlight-icon">📍</span>
                <div>
                  <strong>{a.location.label}</strong>
                  {a.location.value}
                </div>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">🎓</span>
                <div>
                  <strong>{a.education.label}</strong>
                  {a.education.value}
                </div>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">🚀</span>
                <div>
                  <strong>{a.focus.label}</strong>
                  {a.focus.value}
                </div>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">✉️</span>
                <div>
                  <strong>{a.email.label}</strong>
                  {a.email.value}
                </div>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">🌐</span>
                <div>
                  <strong>{a.visa.label}</strong>
                  {a.visa.value}
                </div>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">🤝</span>
                <div>
                  <strong>{a.openTo.label}</strong>
                  {a.openTo.value}
                </div>
              </div>
            </div>

            <div className="lang-section">
              <h4>{a.languagesTitle}</h4>
              <div className="lang-list">
                {a.languages.map((l, i) => (
                  <div className="lang-pill" key={i}>
                    {l.name} <span>{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

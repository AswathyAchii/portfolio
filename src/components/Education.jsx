import { useLanguage } from '../context/LanguageContext'

export default function Education() {
  const { t } = useLanguage()
  const e = t.education

  return (
    <section className="section" id="education">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">{e.label}</span>
          <h2 className="section-title">
            <span>{e.highlight}</span>
          </h2>
          <div className="section-line" />
        </div>

        <div className="education-grid">
          {e.items.map((item, i) => (
            <div className={`card reveal reveal-delay-${i + 1}`} key={i}>
              <div className="edu-icon">{item.icon}</div>
              <div className="edu-degree">{item.degree}</div>
              <div className="edu-school">{item.school}</div>
              <div className="edu-year">
                📍 {item.location} &nbsp;·&nbsp; 🗓 {item.year}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

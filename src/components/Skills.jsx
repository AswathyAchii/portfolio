import { useLanguage } from '../context/LanguageContext'

export default function Skills() {
  const { t } = useLanguage()
  const s = t.skills

  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">{s.label}</span>
          <h2 className="section-title">{s.title} <span>{s.highlight}</span></h2>
          <div className="section-line" />
        </div>

        <div className="skills-grid">
          {s.categories.map((cat, i) => (
            <div className={`card reveal reveal-delay-${(i % 4) + 1}`} key={i}>
              <div className="skill-category-title">
                <span className="icon">{cat.icon}</span>
                {cat.title}
              </div>
              <div className="skill-tags">
                {cat.tags.map((tag) => (
                  <span className={`skill-tag${cat.cyan ? ' cyan' : ''}`} key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { useLanguage } from '../context/LanguageContext'

export default function Projects() {
  const { t } = useLanguage()
  const p = t.projects

  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">{p.label}</span>
          <h2 className="section-title">{p.title} <span>{p.highlight}</span></h2>
          <div className="section-line" />
          <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', fontSize: '0.95rem' }}>
            {p.ndaNote}
          </p>
        </div>

        <div className="projects-grid">
          {p.items.map((item, i) => (
            <div
              className={`card project-card reveal reveal-delay-${(i % 3) + 1}${item.featured ? ' featured' : ''}`}
              key={i}
            >
              {item.featured && (
                <span className="project-featured-badge">{p.featuredBadge}</span>
              )}
              <div className="project-icon">{item.icon}</div>
              <h3 className="project-title">
                {item.title}
                {item.confidential && (
                  <span
                    title={p.confidentialTitle}
                    style={{ marginLeft: '0.4rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}
                  >
                    🔒
                  </span>
                )}
              </h3>
              <p className="project-desc">{item.description}</p>
              <div className="project-tags">
                {item.tags.map((tag) => (
                  <span className="project-tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}

          <div className="card project-placeholder reveal reveal-delay-2">
            <div className="project-placeholder-icon">➕</div>
            <strong>{p.placeholderTitle}</strong>
            <p>{p.placeholderDesc}</p>
          </div>
          <div className="card project-placeholder reveal reveal-delay-2">
            <div className="project-placeholder-icon">➕</div>
            <strong>{p.placeholderTitle}</strong>
            <p>{p.placeholderDesc}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

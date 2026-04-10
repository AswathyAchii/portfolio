import { useLanguage } from '../context/LanguageContext'

export default function Experience() {
  const { t } = useLanguage()
  const e = t.experience

  return (
    <section className="experience section" id="experience">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">{e.label}</span>
          <h2 className="section-title">{e.title} <span>{e.highlight}</span></h2>
          <div className="section-line" />
        </div>

        <div className="timeline">
          {e.jobs.map((job, i) => (
            <div className={`timeline-item reveal reveal-delay-${(i % 3) + 1}`} key={i}>
              <div className="timeline-dot" />
              <div className="card">
                <div className="exp-header">
                  <div>
                    <div className="exp-company">{job.company}</div>
                    <div className="exp-role">{job.role}</div>
                  </div>
                  <div className="exp-meta">
                    <span className="exp-period">📅 {job.period}</span>
                    <span className="exp-location">📍 {job.location}</span>
                  </div>
                </div>
                <ul className="exp-responsibilities">
                  {job.highlights.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

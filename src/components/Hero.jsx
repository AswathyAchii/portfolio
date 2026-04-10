import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

function CountUp({ end, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const duration = 1500
        let startTime = null
        const animate = (timestamp) => {
          if (!startTime) startTime = timestamp
          const progress = Math.min((timestamp - startTime) / duration, 1)
          setCount(Math.floor(progress * end))
          if (progress < 1) requestAnimationFrame(animate)
          else setCount(end)
        }
        requestAnimationFrame(animate)
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [end])

  return <span ref={ref}>{count}{suffix}</span>
}

function Cube({ size, color = 'purple', style = {}, duration = '12s', delay = '0s', floatDuration = '6s' }) {
  const half = size / 2
  return (
    <div
      className="cube-outer"
      style={{ '--float-d': floatDuration, '--delay': delay, position: 'absolute', ...style }}
    >
      <div
        className="cube-inner"
        style={{ width: size, height: size, '--s': `${half}px`, '--rot-d': duration }}
      >
        {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face) => (
          <div key={face} className={`cube-face ${face} cube-${color}`} />
        ))}
      </div>
    </div>
  )
}

function SpinBadge() {
  return (
    <div className="spin-badge">
      <svg viewBox="0 0 120 120" fill="none">
        <defs>
          <path id="tc" d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" />
        </defs>
        <text>
          <textPath
            href="#tc"
            style={{
              fontSize: '9.5px',
              fill: 'var(--purple-light)',
              fontFamily: "'Space Grotesk',sans-serif",
              letterSpacing: '2.5px',
            }}
          >
            FLUTTER · MOBILE ENG · UAE · &nbsp;
          </textPath>
        </text>
      </svg>
      <div className="spin-badge-center" />
    </div>
  )
}

export default function Hero() {
  const { t } = useLanguage()
  const roles = t.hero.roles
  const [roleIdx, setRoleIdx] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % roles.length)
        setFading(false)
      }, 300)
    }, 2800)
    return () => clearInterval(id)
  }, [roles.length])

  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />
        <Cube size={55} color="purple" style={{ top: '8%',   right: '6%'  }} duration="11s" floatDuration="7s" />
        <Cube size={40} color="cyan"   style={{ top: '65%',  right: '2%'  }} duration="14s" delay="1s"   floatDuration="5s" />
        <Cube size={70} color="purple" style={{ top: '5%',   right: '28%' }} duration="17s" delay="2s"   floatDuration="8s" />
        <Cube size={45} color="cyan"   style={{ bottom: '10%', right: '10%' }} duration="13s" delay="0.5s" floatDuration="6s" />
        <Cube size={35} color="purple" style={{ top: '42%',  right: '22%' }} duration="9s"  delay="1.5s" floatDuration="5s" />
      </div>

      <div className="container">
        <div className="hero-container">
          <div>
            <div className="hero-badge">
              <span className="dot" />
              {t.hero.badge}
            </div>

            <h1 className="hero-name">
              <span className="gradient-text">Aswathy</span>
              <br />Gireesh
            </h1>

            <p className="hero-title">
              {t.hero.seniorPrefix}{' '}
              <span className={`hero-role-text${fading ? ' fade-out' : ''}`}>
                {roles[roleIdx]}
              </span>
            </p>

            <p className="hero-description">{t.hero.description}</p>

            <div className="hero-cta">
              <a href="#projects" className="btn btn-primary">
                {t.hero.viewWork}
              </a>
              <a href="#contact" className="btn btn-outline">
                {t.hero.getInTouch}
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <div className="stat-number"><CountUp end={4} suffix="+" /></div>
                <div className="stat-label">{t.hero.years}</div>
              </div>
              <div>
                <div className="stat-number"><CountUp end={10} suffix="+" /></div>
                <div className="stat-label">{t.hero.apps}</div>
              </div>
              <div>
                <div className="stat-number"><CountUp end={2} /></div>
                <div className="stat-label">{t.hero.countries}</div>
              </div>
            </div>
          </div>

          <div className="hero-image-wrap">
            <div className="hero-image-frame">
              <div className="hero-image-ring" />
              <div className="hero-image-inner">
                <img
                  src="profile.jpg"
                  alt="Aswathy Gireesh"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="hero-image-placeholder" style={{ display: 'none' }}>
                  👩‍💻
                </div>
              </div>

              <div className="floating-tag floating-tag-1">📱 Flutter Expert</div>
              <div className="floating-tag floating-tag-2">🏗️ Clean Architecture</div>
              <div className="floating-tag floating-tag-3">🇦🇪 Based in UAE</div>

              <SpinBadge />
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}

import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, setLang, t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleLang = () => setLang(lang === 'en' ? 'ar' : 'en')

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        <div className="nav-inner">
          <a href="#" className="nav-logo">AG</a>

          <ul className="nav-links">
            {t.nav.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="nav-link">{l.label}</a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button className="lang-toggle" onClick={toggleLang} aria-label="Switch language">
              {lang === 'en' ? 'عربي' : 'EN'}
            </button>
            <a href="mailto:aswathygireeshn@gmail.com" className="btn btn-primary btn-outline nav-cta">
              {t.nav.hireMe}
            </a>
          </div>

          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <ul className={`mobile-menu${menuOpen ? ' open' : ''}`}>
          {t.nav.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="nav-link" onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <button
              className="lang-toggle mobile-lang"
              onClick={() => { toggleLang(); setMenuOpen(false) }}
            >
              {lang === 'en' ? 'عربي' : 'EN'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

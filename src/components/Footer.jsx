import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <span className="footer-logo">AG</span>
          <span className="footer-copy">
            © {year} Aswathy Gireesh — {t.footer.rights}
          </span>
          <div className="footer-links">
            <a href="mailto:aswathygireeshn@gmail.com">{t.footer.email}</a>
            <a href="https://linkedin.com/in/aswathygireesh1" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="#home">{t.footer.top}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

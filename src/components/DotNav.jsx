import { useState, useEffect } from 'react'

const sections = [
  { id: 'about',      label: 'About' },
  { id: 'skills',     label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects' },
  { id: 'education',  label: 'Education' },
  { id: 'contact',    label: 'Contact' },
]

export default function DotNav() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      )
      obs.observe(el)
      return obs
    })

    return () => observers.forEach((obs) => obs && obs.disconnect())
  }, [])

  return (
    <nav className="dot-nav" aria-label="Section navigation">
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`dot-nav-item${active === id ? ' active' : ''}`}
          aria-label={label}
        >
          <span className="dot-nav-label">{label}</span>
          <span className="dot-nav-dot" />
        </a>
      ))}
    </nav>
  )
}

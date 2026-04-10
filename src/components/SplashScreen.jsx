import { useState, useEffect } from 'react'

export default function SplashScreen({ onDone }) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setExiting(true), 2200)
    const t2 = setTimeout(() => onDone(), 2700)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [onDone])

  return (
    <div className={`splash${exiting ? ' splash-exit' : ''}`}>
      <div className="splash-content">
        <div className="splash-logo-wrap">
          <span className="splash-letter splash-letter-a">A</span>
          <span className="splash-letter splash-letter-g">G</span>
        </div>
        <div className="splash-name">Aswathy Gireesh</div>
        <div className="splash-bar" />
      </div>
    </div>
  )
}

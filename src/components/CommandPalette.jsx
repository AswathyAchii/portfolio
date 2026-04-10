import { useState, useEffect, useRef, useCallback } from 'react'
import { useLanguage } from '../context/LanguageContext'

const commandIcons = {
  about: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  ),
  skills: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  experience: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  ),
  projects: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h7v7H3z" />
      <path d="M14 3h7v7h-7z" />
      <path d="M3 14h7v7H3z" />
      <path d="M14 14h7v7h-7z" />
    </svg>
  ),
  education: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  contact: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const { t } = useLanguage()

  const commands = t.cmd.commands.map((c) => ({
    ...c,
    icon: commandIcons[c.id],
  }))

  const filtered = query.trim()
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase())
      )
    : commands

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setCursor(0)
  }, [])

  const navigate = useCallback(
    (cmd) => {
      close()
      const el = document.querySelector(cmd.href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    },
    [close]
  )

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 30)
      setCursor(0)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') { close(); return }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setCursor((c) => Math.min(c + 1, filtered.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setCursor((c) => Math.max(c - 1, 0))
      }
      if (e.key === 'Enter' && filtered[cursor]) {
        navigate(filtered[cursor])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, cursor, filtered, close, navigate])

  useEffect(() => {
    setCursor(0)
  }, [query])

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${cursor}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [cursor])

  if (!open) return null

  return (
    <div className="cmd-backdrop" onClick={close}>
      <div className="cmd-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Command palette">
        <div className="cmd-header">
          <svg className="cmd-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            className="cmd-input"
            placeholder={t.cmd.placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="cmd-esc-key" onClick={close}>esc</kbd>
        </div>

        <div className="cmd-divider" />

        <ul className="cmd-list" ref={listRef} role="listbox">
          {filtered.length === 0 && (
            <li className="cmd-empty">{t.cmd.noResults} "{query}"</li>
          )}
          {filtered.map((cmd, i) => (
            <li
              key={cmd.id}
              data-index={i}
              className={`cmd-item${cursor === i ? ' active' : ''}`}
              role="option"
              aria-selected={cursor === i}
              onMouseEnter={() => setCursor(i)}
              onClick={() => navigate(cmd)}
            >
              <span className="cmd-item-icon">{cmd.icon}</span>
              <span className="cmd-item-text">
                <span className="cmd-item-label">{cmd.label}</span>
                <span className="cmd-item-desc">{cmd.description}</span>
              </span>
              <span className="cmd-item-enter">↵</span>
            </li>
          ))}
        </ul>

        <div className="cmd-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> {t.cmd.navigate}</span>
          <span><kbd>↵</kbd> {t.cmd.select}</span>
          <span><kbd>esc</kbd> {t.cmd.close}</span>
        </div>
      </div>
    </div>
  )
}

import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    // Observe all current .reveal elements
    const observeAll = () => {
      document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    }
    observeAll()

    // Watch for new .reveal elements added by language switches or re-renders
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return
          if (node.classList?.contains('reveal')) io.observe(node)
          node.querySelectorAll?.('.reveal').forEach((el) => io.observe(el))
        })
      })
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
}

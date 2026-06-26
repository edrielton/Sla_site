import { useState, useEffect } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const secs = ['hero', 'timeline', 'records', 'legends', 'mvp', 'comparador', 'stats', 'quiz']
      let cur = 'hero'
      secs.forEach(id => {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 80) cur = id
      })
      setActive(cur)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav id="nav" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-logo">⚽ Copa do Mundo</div>
      <ul className={`nav-links${open ? ' open' : ''}`}>
        <li><a href="#hero" className={active === 'hero' ? 'active' : ''} onClick={() => setOpen(false)}>Início</a></li>
        <li><a href="#timeline" className={active === 'timeline' ? 'active' : ''} onClick={() => setOpen(false)}>Linha do Tempo</a></li>
        <li><a href="#records" className={active === 'records' ? 'active' : ''} onClick={() => setOpen(false)}>Recordes</a></li>
        <li><a href="#legends" className={active === 'legends' ? 'active' : ''} onClick={() => setOpen(false)}>Lendas</a></li>
        <li><a href="#mvp" className={active === 'mvp' ? 'active' : ''} onClick={() => setOpen(false)}>MVPs</a></li>
        <li><a href="#comparador" className={active === 'comparador' ? 'active' : ''} onClick={() => setOpen(false)}>Comparar</a></li>
        <li><a href="#stats" className={active === 'stats' ? 'active' : ''} onClick={() => setOpen(false)}>Estatísticas</a></li>
        <li><a href="#quiz" className={active === 'quiz' ? 'active' : ''} onClick={() => setOpen(false)}>Quiz</a></li>
      </ul>
      <button className="ham" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
    </nav>
  )
}

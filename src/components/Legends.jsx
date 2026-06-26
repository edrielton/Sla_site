import { useState, useEffect, useRef } from 'react'
import { LEGENDS } from '../data'

export default function Legends({ onPlayerClick }) {
  const [search, setSearch] = useState('')
  const ref = useRef()

  const filtered = LEGENDS.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.nick.toLowerCase().includes(search.toLowerCase()) ||
    l.cups.includes(search)
  )

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('shown'); observer.unobserve(e.target) } })
    }, { threshold: 0.08 })
    if (ref.current) ref.current.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [search])

  return (
    <section id="legends" ref={ref}>
      <div className="wrap">
        <p className="sec-eyebrow reveal">Galeria dos Imortais</p>
        <h2 className="sec-title reveal">LENDAS DO JOGO</h2>
        <p className="sec-desc reveal">Os jogadores que definiram épocas. Clique em cada lenda para conhecer sua história.</p>
        <div className="search-bar reveal">
          <input
            type="text"
            placeholder="🔍 Buscar por nome, apelido ou Copa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          {search && <button className="search-clear" onClick={() => setSearch('')}>✕</button>}
        </div>
        <div className="legends-grid">
          {filtered.length === 0 ? (
            <div className="no-results">Nenhuma lenda encontrada para "{search}"</div>
          ) : (
            filtered.map((l, i) => (
              <div className="lg-card reveal" key={i} onClick={() => onPlayerClick(null, l)}>
                <span className="lg-flag">{l.flag}</span>
                <div className="lg-img-wrap">
                  {l.img
                    ? <img src={l.img} alt={l.name} onError={(e) => { e.target.parentElement.textContent = l.name.slice(0, 2).toUpperCase() }} />
                    : l.name.slice(0, 2).toUpperCase()
                  }
                </div>
                <div className="lg-name">{l.name}</div>
                <div className="lg-nick">"{l.nick}"</div>
                <div className="lg-cups">Copas: {l.cups}</div>
                <div className="lg-goals">⚽ {l.goals}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

import { useState, useEffect, useRef } from 'react'
import { CUPS } from '../data'

const FILTERS = [
  { type: 'all', label: 'Todos' },
  { type: 'sa', label: '🌎 América Sul' },
  { type: 'eu', label: '🌍 Europa' },
  { type: 'brasil', label: '🇧🇷 Brasil' },
  { type: 'argentina', label: '🇦🇷 Argentina' },
  { type: 'alemanha', label: '🇩🇪 Alemanha' },
  { type: 'franca', label: '🇫🇷 França' },
]

export default function Timeline({ onPlayerClick }) {
  const [filter, setFilter] = useState('all')
  const [openCards, setOpenCards] = useState({})
  const ref = useRef()

  const toggleCard = (i) => {
    setOpenCards(prev => ({ ...prev, [i]: !prev[i] }))
  }

  const showEntry = (cup) => {
    if (filter === 'all') return true
    if (filter === 'sa') return cup.champC === 'sa'
    if (filter === 'eu') return cup.champC === 'eu'
    const champ = cup.champ.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
    if (filter === 'brasil') return champ.includes('brasil')
    if (filter === 'argentina') return champ.includes('argentina')
    if (filter === 'alemanha') return champ.includes('alemanha')
    if (filter === 'franca') return champ.includes('franca') || champ.includes('fran')
    return true
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('shown'); observer.unobserve(e.target) } })
    }, { threshold: 0.08 })
    if (ref.current) ref.current.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [filter])

  return (
    <section id="timeline" ref={ref}>
      <div className="wrap">
        <p className="sec-eyebrow reveal">Linha do Tempo</p>
        <h2 className="sec-title reveal">40 ANOS DE HISTÓRIA</h2>
<p className="sec-desc reveal">Da mão de Deus em 1986 ao Qatar em 2022. Filtra por campeão ou continente e lembra de cada edição.</p>
        <div className="tl-filters reveal">
          {FILTERS.map(f => (
            <button key={f.type} className={`tf${filter === f.type ? ' on' : ''}`} onClick={() => setFilter(f.type)}>{f.label}</button>
          ))}
        </div>
        <div className="tl-track">
          {CUPS.map((c, i) => {
            if (!showEntry(c)) return null
            return (
              <div className="tl-entry reveal" key={i}>
                <div className="tl-node"></div>
                <div className="tl-card">
                  <div className="tl-head" onClick={() => toggleCard(i)}>
                    <div className="tl-yr">{c.year}</div>
                    <div className="tl-meta">
                      <div className="tl-host">📍 {c.host}</div>
                      <div className="tl-champ">{c.champF} {c.champ}</div>
                      <div className="tl-score">{c.final}</div>
                    </div>
                    <span className={`tl-badge ${c.badgeCls}`}>{c.badge}</span>
                  </div>
                  <div className="tl-body">
                    <p className="tl-marco">{c.marco}</p>
                    <div className="tl-players">
                      {c.players.map((p, pi) => (
                        <div className="pl-chip" key={pi} onClick={() => onPlayerClick(p.id)}>
                          <div className="pl-av">
{p.img
                              ? <img src={p.img} alt={p.name} loading="lazy" onError={(e) => { e.target.parentElement.textContent = p.name.slice(0, 2).toUpperCase() }} />
                              : p.name.slice(0, 2).toUpperCase()
                            }
                          </div>
                          <div className="pl-info">
                            <div className="pl-name">{p.flag} {p.name}</div>
                            <div className="pl-nick">{p.nick}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="tl-stats">
                      <div className="ts"><div className="ts-v">{c.gols}</div><div className="ts-l">Gols</div></div>
                      <div className="ts"><div className="ts-v">{c.jogos}</div><div className="ts-l">Partidas</div></div>
                      <div className="ts"><div className="ts-v">{c.times}</div><div className="ts-l">Seleções</div></div>
                      <div className="ts"><div className="ts-v">{(c.gols / c.jogos).toFixed(1)}</div><div className="ts-l">Gols/jogo</div></div>
                    </div>
                  </div>
                  <button className="tl-toggler" onClick={() => toggleCard(i)}>{openCards[i] ? '▲ Fechar detalhes' : '▼ Detalhes históricos'}</button>
                  <div className={`tl-extra${openCards[i] ? ' open' : ''}`}>
                    <p>{c.extra}</p>
                    <div className="tl-extra-grid">
                      <div className="te-item"><div className="te-lbl">Artilheiro</div><div className="te-val">{c.artilheiro}</div></div>
                      <div className="te-item"><div className="te-lbl">Melhor jogador</div><div className="te-val">{c.mvp}</div></div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

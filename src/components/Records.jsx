import { useEffect, useRef } from 'react'

const RECORDS = [
  { icon: '⚽', title: 'Mais gols em Copas', player: 'Miroslav Klose', value: '16 gols', detail: 'Alemanha · 2002–2014' },
  { icon: '🏆', title: 'Mais títulos', player: 'Pelé', value: '3 títulos', detail: 'Brasil · 1958, 1962, 1970' },
  { icon: '🎯', title: 'Mais gols em uma Copa', player: 'Just Fontaine', value: '13 gols', detail: 'França · Copa 1958' },
  { icon: '🧤', title: 'Mais clean sheets', player: 'Peter Shilton', value: '10 jogos', detail: 'Inglaterra · 1982–1990' },
  { icon: '⏱️', title: 'Gol mais rápido', player: 'Hakan Şükür', value: '11 segundos', detail: 'Turquia · Copa 2002' },
  { icon: '👤', title: 'Mais participações', player: 'Lothar Matthäus', value: '5 Copas', detail: 'Alemanha · 1982–1998' },
  { icon: '🧤', title: 'Único goleiro Bola de Ouro', player: 'Oliver Kahn', value: 'Copa 2002', detail: 'Alemanha · Vice-campeão' },
  { icon: '🎯', title: 'Hat-trick mais rápido', player: 'Pelé', value: '23 minutos', detail: 'Brasil · Copa 1958' },
]

export default function Records() {
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('shown'); observer.unobserve(e.target) } })
    }, { threshold: 0.08 })
    if (ref.current) ref.current.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="records" className="records-section" ref={ref}>
      <div className="wrap">
        <p className="sec-eyebrow reveal">Marcos Históricos</p>
        <h2 className="sec-title reveal">RECORDES DAS COPAS</h2>
<p className="sec-desc reveal">Os números que ninguém esquece. Recordes que até hoje rendem papo.</p>
        <div className="records-grid">
          {RECORDS.map((r, i) => (
            <div className="record-card reveal" key={i}>
              <div className="record-icon">{r.icon}</div>
              <div className="record-title">{r.title}</div>
              <div className="record-player">{r.player}</div>
              <div className="record-value">{r.value}</div>
              <div className="record-detail">{r.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

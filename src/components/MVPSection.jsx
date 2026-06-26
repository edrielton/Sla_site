import { useEffect, useRef } from 'react'
import { CUPS } from '../data'

export default function MVPSection() {
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('shown'); observer.unobserve(e.target) } })
    }, { threshold: 0.08 })
    if (ref.current) ref.current.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="mvp" className="mvp-section" ref={ref}>
      <div className="wrap">
        <p className="sec-eyebrow reveal">Os Melhores</p>
        <h2 className="sec-title reveal">MELHOR JOGADOR DE CADA COPA</h2>
        <p className="sec-desc reveal">Quem brilhou em cada edição e levou a Bola de Ouro.</p>
        <div className="mvp-grid">
          {CUPS.map((c, i) => {
            const mvpPlayer = c.players?.[0]
            return (
              <div className="mvp-card reveal" key={i}>
                {mvpPlayer?.img && (
                  <div className="mvp-img">
                    <img src={mvpPlayer.img} alt={mvpPlayer.name} onError={(e) => { e.target.style.display = 'none' }} />
                  </div>
                )}
                <div className="mvp-year">{c.year}</div>
                <div className="mvp-flag">{c.champF}</div>
                <div className="mvp-name">{c.mvp}</div>
                {c.mvpDetail && <div className="mvp-detail">{c.mvpDetail}</div>}
                <div className="mvp-host">📍 {c.host}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

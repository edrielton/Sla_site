import { useEffect, useRef } from 'react'
import { CUPS } from '../data'

function BarChart({ title, items, color }) {
  return (
    <div className="ch-wrap">
      <div className="ch-title">{title}</div>
      {items.map((item, i) => (
        <div className="bar-row" key={i}>
          <div className="bar-lbl">{item.label}</div>
          <div className="bar-track">
            <div className={`bar-fill ${color}`} style={{ width: item.width }}>{item.value}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Stats() {
  const ref = useRef()

useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('shown')
          e.target.querySelectorAll('.bar-fill[data-w]').forEach(bar => {
            bar.style.width = bar.dataset.w
          })
          observer.unobserve(e.target)
        }
      })
    }, { threshold: 0.2 })
    if (ref.current) {
      ref.current.querySelectorAll('.reveal').forEach(el => observer.observe(el))
      ref.current.querySelectorAll('.ch-wrap').forEach(el => observer.observe(el))
    }
    return () => observer.disconnect()
  }, [])

  const maxG = Math.max(...CUPS.map(c => c.gols))
  const goalsItems = CUPS.map(c => ({
    label: `${c.year} ${c.champF}`,
    value: `${c.gols} gols`,
    width: `${Math.round(c.gols / maxG * 100)}%`
  }))

  const titlesData = [
    { n: 'Alemanha', f: '🇩🇪', t: 2 }, { n: 'Brasil', f: '🇧🇷', t: 2 },
    { n: 'Argentina', f: '🇦🇷', t: 2 }, { n: 'França', f: '🇫🇷', t: 2 },
    { n: 'Itália', f: '🇮🇹', t: 1 }, { n: 'Espanha', f: '🇪🇸', t: 1 }
  ]
  const titlesItems = titlesData.map(t => ({
    label: `${t.f} ${t.n}`,
    value: '🏆'.repeat(t.t),
    width: `${t.t * 50}%`
  }))

  const scorersData = [
    { n: 'Klose 🇩🇪', g: 16 }, { n: 'Ronaldo R9 🇧🇷', g: 15 },
    { n: 'Messi 🇦🇷', g: 13 }, { n: 'Mbappé 🇫🇷', g: 12 },
    { n: 'Maradona 🇦🇷', g: 8 }, { n: 'Romário 🇧🇷', g: 5 }
  ]
  const maxS = 16
  const scorersItems = scorersData.map(s => ({
    label: s.n,
    value: `${s.g} gols`,
    width: `${Math.round(s.g / maxS * 100)}%`
  }))

  return (
    <section id="stats" ref={ref}>
      <div className="wrap">
        <p className="sec-eyebrow reveal">Números</p>
        <h2 className="sec-title reveal">ESTATÍSTICAS GERAIS</h2>
<p className="sec-desc reveal">Os dados das 10 últimas Copas, lado a lado, pra comparar do jeito que a gente gosta.</p>
        <div className="stats-grid">
          <div className="stat-c reveal"><span className="stat-ico">🥅</span><div className="stat-num">1.473</div><div className="stat-lbl">Gols marcados</div><div className="stat-sub">1986 – 2022</div></div>
          <div className="stat-c reveal"><span className="stat-ico">🏆</span><div className="stat-num">16</div><div className="stat-lbl">Gols de Miroslav Klose</div><div className="stat-sub">Recorde histórico</div></div>
          <div className="stat-c reveal"><span className="stat-ico">🇧🇷</span><div className="stat-num">5</div><div className="stat-lbl">Títulos do Brasil</div><div className="stat-sub">Maior campeão da história</div></div>
          <div className="stat-c reveal"><span className="stat-ico">📅</span><div className="stat-num">4</div><div className="stat-lbl">Anos entre cada Copa</div><div className="stat-sub">Ciclo do futebol mundial</div></div>
          <div className="stat-c reveal"><span className="stat-ico">🌍</span><div className="stat-num">7</div><div className="stat-lbl">Países-sede diferentes</div><div className="stat-sub">nas últimas 10 edições</div></div>
          <div className="stat-c reveal"><span className="stat-ico">⚽</span><div className="stat-num">2,4</div><div className="stat-lbl">Média gols/jogo</div><div className="stat-sub">média das 10 Copas</div></div>
        </div>
        <BarChart title="⚽ Gols por Copa" items={goalsItems} color="gold" />
        <BarChart title="🏆 Títulos por seleção (1986–2022)" items={titlesItems} color="green" />
        <BarChart title="👑 Maiores artilheiros históricos em Copas" items={scorersItems} color="gold" />
      </div>
    </section>
  )
}

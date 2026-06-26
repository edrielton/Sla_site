import { useMemo } from 'react'
import CountUp from './CountUp'

const FLAGS_SVG = [
  { name:'BRA', svg: `<rect width="36" height="24" fill="#009c3b"/><polygon points="18,4 34,12 18,20 2,12" fill="#ffdf00"/><circle cx="18" cy="12" r="5" fill="#002776"/>` },
  { name:'ARG', svg: `<rect width="36" height="24" fill="#74acdf"/><rect y="8" width="36" height="8" fill="#fff"/><circle cx="18" cy="12" r="3" fill="#f6b40e"/>` },
  { name:'GER', svg: `<rect width="36" height="8" fill="#000"/><rect y="8" width="36" height="8" fill="#dd0000"/><rect y="16" width="36" height="8" fill="#ffcc00"/>` },
  { name:'FRA', svg: `<rect width="12" height="24" fill="#002395"/><rect x="12" width="12" height="24" fill="#fff"/><rect x="24" width="12" height="24" fill="#ed2939"/>` },
  { name:'ITA', svg: `<rect width="12" height="24" fill="#008c45"/><rect x="12" width="12" height="24" fill="#fff"/><rect x="24" width="12" height="24" fill="#cd212a"/>` },
  { name:'ESP', svg: `<rect width="36" height="6" fill="#c60b1e"/><rect y="6" width="36" height="12" fill="#ffc400"/><rect y="18" width="36" height="6" fill="#c60b1e"/>` },
  { name:'URU', svg: `<rect width="36" height="6" fill="#fff"/><rect y="6" width="36" height="6" fill="#5bcbeb"/><rect y="12" width="36" height="6" fill="#fff"/><rect y="18" width="36" height="6" fill="#5bcbeb"/><circle cx="9" cy="6" r="2.5" fill="#fff"/>` },
  { name:'ENG', svg: `<rect width="36" height="24" fill="#012169"/><path d="M0,0 L36,24 M36,0 L0,24" stroke="#fff" stroke-width="3"/><path d="M0,0 L36,24 M36,0 L0,24" stroke="#c8102e" stroke-width="1.5"/><rect x="15" y="0" width="6" height="24" fill="#fff"/><rect x="0" y="9" width="36" height="6" fill="#fff"/><rect x="15.5" y="0" width="5" height="24" fill="#c8102e"/><rect x="0" y="9.5" width="36" height="5" fill="#c8102e"/>` },
  { name:'NED', svg: `<rect width="36" height="8" fill="#ae1c28"/><rect y="8" width="36" height="8" fill="#fff"/><rect y="16" width="36" height="8" fill="#21468b"/>` },
  { name:'POR', svg: `<rect width="14" height="24" fill="#006600"/><rect x="14" width="22" height="24" fill="#ff0000"/><circle cx="14" cy="12" r="5" fill="#ffcc00"/><circle cx="14" cy="12" r="3" fill="#006600"/>` },
]

export default function Hero() {
  const flags = useMemo(() =>
    FLAGS_SVG.map((f, i) => ({
      ...f,
      left: 2 + (i * 9.8),
      delay: i * 0.9,
      dur: 8 + Math.random() * 5,
    })), [])

  return (
    <section id="hero">
      <div className="hero-bg"></div>
      <div className="hero-grid"></div>
      <div className="hero-flags-float">
        {flags.map((f, i) => (
          <svg key={i} className="hero-flag-svg" viewBox="0 0 36 24" style={{
            left: `${f.left}%`,
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.dur}s`,
          }} dangerouslySetInnerHTML={{ __html: f.svg }} />
        ))}
      </div>
      <span className="hero-ball">⚽</span>
      <div className="hero-tag">Site Educacional Interativo</div>
      <h1 className="hero-h">COPA DO<br />MUNDO</h1>
      <p className="hero-sub">Explore 40 anos de futebol — das mãos de Maradona ao milagre de Messi. Lendas, marcos históricos, quiz e muito mais.</p>
      <div className="hero-pills">
        <div className="hero-pill"><div className="hp-n"><CountUp end={10} /></div><div className="hp-l">Edições</div></div>
        <div className="hero-pill"><div className="hp-n"><CountUp end={1473} /></div><div className="hp-l">Gols</div></div>
        <div className="hero-pill"><div className="hp-n">30+</div><div className="hp-l">Lendas</div></div>
        <div className="hero-pill"><div className="hp-n"><CountUp end={608} /></div><div className="hp-l">Partidas</div></div>
      </div>
      <a href="#timeline" className="hero-cta">Começar a explorar →</a>
      <div className="scroll-cue">Rolar</div>
    </section>
  )
}

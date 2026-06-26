import { useState, useEffect, useMemo } from 'react'

const FLAGS_SVG = [
  `<rect width="36" height="24" fill="#009c3b"/><polygon points="18,4 34,12 18,20 2,12" fill="#ffdf00"/><circle cx="18" cy="12" r="5" fill="#002776"/>`,
  `<rect width="36" height="24" fill="#74acdf"/><rect y="8" width="36" height="8" fill="#fff"/><circle cx="18" cy="12" r="3" fill="#f6b40e"/>`,
  `<rect width="36" height="8" fill="#000"/><rect y="8" width="36" height="8" fill="#dd0000"/><rect y="16" width="36" height="8" fill="#ffcc00"/>`,
  `<rect width="12" height="24" fill="#002395"/><rect x="12" width="12" height="24" fill="#fff"/><rect x="24" width="12" height="24" fill="#ed2939"/>`,
  `<rect width="12" height="24" fill="#008c45"/><rect x="12" width="12" height="24" fill="#fff"/><rect x="24" width="12" height="24" fill="#cd212a"/>`,
  `<rect width="36" height="6" fill="#c60b1e"/><rect y="6" width="36" height="12" fill="#ffc400"/><rect y="18" width="36" height="6" fill="#c60b1e"/>`,
  `<rect width="36" height="6" fill="#fff"/><rect y="6" width="36" height="6" fill="#5bcbeb"/><rect y="12" width="36" height="6" fill="#fff"/><rect y="18" width="36" height="6" fill="#5bcbeb"/><circle cx="9" cy="6" r="2.5" fill="#fff"/>`,
  `<rect width="36" height="8" fill="#ae1c28"/><rect y="8" width="36" height="8" fill="#fff"/><rect y="16" width="36" height="8" fill="#21468b"/>`,
]

export default function IntroScreen({ onComplete }) {
  const [step, setStep] = useState(0)
  const [fading, setFading] = useState(false)

  const confetti = useMemo(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 6,
      dur: 3 + Math.random() * 4,
      size: 22 + Math.random() * 16,
      svg: FLAGS_SVG[i % FLAGS_SVG.length],
    })), [])

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 1500),
      setTimeout(() => setStep(3), 2800),
      setTimeout(() => setStep(4), 3800),
      setTimeout(() => setStep(5), 4800),
      setTimeout(() => {
        setFading(true)
        setTimeout(onComplete, 1200)
      }, 6200),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div className={`intro-screen${fading ? ' fade-out' : ''}`}>
      <div className="intro-confetti">
        {confetti.map(c => (
          <svg key={c.id} className="confetti-flag" viewBox="0 0 36 24" style={{
            left: `${c.left}%`,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.dur}s`,
            width: `${c.size}px`,
          }} dangerouslySetInnerHTML={{ __html: c.svg }} />
        ))}
      </div>

      <div className="intro-stadium">
        <svg viewBox="0 0 800 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="stadium-svg">
          <path d="M0 120 Q200 20 400 20 Q600 20 800 120" stroke="rgba(255,215,0,0.1)" strokeWidth="2" fill="none"/>
          <path d="M50 120 Q200 40 400 40 Q600 40 750 120" stroke="rgba(255,215,0,0.06)" strokeWidth="1.5" fill="none"/>
          <ellipse cx="400" cy="95" rx="180" ry="25" stroke="rgba(255,215,0,0.08)" strokeWidth="1" fill="none"/>
        </svg>
      </div>

      <div className="intro-content">
        <div className={`intro-trophy${step >= 1 ? ' show' : ''}`}>🏆</div>
        <div className={`intro-line intro-title${step >= 2 ? ' show' : ''}`}>
          COPA DO MUNDO
        </div>
        <div className={`intro-divider${step >= 2 ? ' show' : ''}`} />
        <div className={`intro-line intro-developer${step >= 3 ? ' show' : ''}`}>
          Desenvolvido por <span className="intro-name">Edrielton</span>
        </div>
        <div className={`intro-line intro-purpose${step >= 3 ? ' show' : ''}`}>
          Para fins educativos
        </div>
        <div className={`intro-divider small${step >= 4 ? ' show' : ''}`} />
        <div className={`intro-line intro-desc${step >= 4 ? ' show' : ''}`}>
          Vamos conhecer um pouco mais
        </div>
        <div className={`intro-line intro-desc2${step >= 5 ? ' show' : ''}`}>
          sobre as <span className="intro-highlight">10 Copas do Mundo</span> anteriores
        </div>
        <div className={`intro-flags-row${step >= 5 ? ' show' : ''}`}>
          {FLAGS_SVG.slice(0, 6).map((svg, i) => (
            <svg key={i} className="intro-flag-icon" viewBox="0 0 36 24" dangerouslySetInnerHTML={{ __html: svg }} />
          ))}
        </div>
      </div>
    </div>
  )
}

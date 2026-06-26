import { useState, useEffect, useRef } from 'react'
import { CUPS } from '../data'

const CMP_ROWS = [
  { lbl: 'Ano', key: 'year' },
  { lbl: 'Sede', key: 'host' },
  { lbl: 'Campeão', key: 'champ' },
  { lbl: 'Placar final', key: 'final' },
  { lbl: 'Total de gols', key: 'gols', num: true },
  { lbl: 'Partidas', key: 'jogos', num: true },
  { lbl: 'Gols/jogo', key: 'gpj', num: true },
  { lbl: 'Seleções', key: 'times', num: true },
  { lbl: 'Artilheiro', key: 'artilheiro' },
  { lbl: 'Melhor jogador', key: 'mvp' },
]

export default function Comparador() {
  const [idx1, setIdx1] = useState(4)
  const [idx2, setIdx2] = useState(9)
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('shown'); observer.unobserve(e.target) } })
    }, { threshold: 0.08 })
    if (ref.current) ref.current.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const c1 = { ...CUPS[idx1], gpj: +(CUPS[idx1].gols / CUPS[idx1].jogos).toFixed(2) }
  const c2 = { ...CUPS[idx2], gpj: +(CUPS[idx2].gols / CUPS[idx2].jogos).toFixed(2) }

  return (
    <section id="comparador" ref={ref}>
      <div className="wrap">
        <p className="sec-eyebrow reveal">Ferramenta Interativa</p>
        <h2 className="sec-title reveal">COMPARAR COPAS</h2>
        <p className="sec-desc reveal">Escolha duas edições e analise as estatísticas lado a lado.</p>
        <div className="cmp-selects reveal">
          <select value={idx1} onChange={(e) => setIdx1(+e.target.value)}>
            {CUPS.map((c, i) => (
              <option key={i} value={i}>{c.year} – {c.host} ({c.champF} {c.champ})</option>
            ))}
          </select>
          <div className="vs">VS</div>
          <select value={idx2} onChange={(e) => setIdx2(+e.target.value)}>
            {CUPS.map((c, i) => (
              <option key={i} value={i}>{c.year} – {c.host} ({c.champF} {c.champ})</option>
            ))}
          </select>
        </div>
        <div className="cmp-wrap">
          <table className="cmp-table">
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Estatística</th>
                <th>{c1.year} · {c1.host}</th>
                <th>{c2.year} · {c2.host}</th>
              </tr>
            </thead>
            <tbody>
              {CMP_ROWS.map((r, i) => {
                let v1 = c1[r.key], v2 = c2[r.key]
                if (r.num) {
                  const mx = Math.max(v1, v2)
                  const p1 = Math.round((v1 / mx) * 100), p2 = Math.round((v2 / mx) * 100)
                  return (
                    <tr key={i}>
                      <td className="rl">{r.lbl}</td>
                      <td className={v1 >= v2 ? ' hi' : ''}><div className="bar-pair"><div className="mini-bar" style={{ width: `${p1}%` }}></div>{v1}</div></td>
                      <td className={v2 >= v1 ? ' hi' : ''}><div className="bar-pair">{v2}<div className="mini-bar" style={{ width: `${p2}%` }}></div></div></td>
                    </tr>
                  )
                }
                return <tr key={i}><td className="rl">{r.lbl}</td><td>{v1}</td><td>{v2}</td></tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

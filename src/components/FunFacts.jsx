import { useState, useEffect } from 'react'

const FACTS = [
  "O Estádio Maracanã já recebeu mais de 1 milhão de pessoas em uma única Copa (1950).",
  "Pelé é o único jogador a ganhar 3 Copas do Mundo (1958, 1962, 1970).",
  "A Copa de 2022 no Qatar foi a mais cara da história, custando ~US$220 bilhões.",
  "A final de 1950 entre Brasil e Uruguai teve quase 200 mil torcedores no Maracanã.",
  "Just Fontaine fez 13 gols em uma única Copa (1958) — recorde que permanece.",
  "O Brasil é o único país que participou de todas as Copas do Mundo.",
  "A Copa de 1930 teve apenas 13 seleções participantes.",
  "O primeiro gol da história das Copas foi marcado por Lucien Laurent (França, 1930).",
  "A Itália e a Alemanha possuem 4 títulos cada — empatadas com a Argentina.",
  "O cartão vermelho foi introduzido apenas na Copa de 1970.",
  "O impedimento foi abolido brevemente na Copa de 1990 e trouxe o futebol mais defensivo da história.",
  "A Copa de 1966 foi a única em que a Inglaterra foi campeã — e foi na Inglaterra.",
  "O polvo Paul acertou todos os resultados da Copa de 2010 na África do Sul.",
  "A Bola de Ouro da Copa é entregue desde 1982.",
  "Zidane foi expulso na final de 2006 e mesmo assim ganhou a Bola de Ouro do torneio."
]

export default function FunFacts() {
  const [idx, setIdx] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setIdx(i => (i + 1) % FACTS.length)
        setFade(true)
      }, 400)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fun-facts">
      <div className="ff-icon">💡</div>
      <div className={`ff-text${fade ? ' visible' : ''}`}>{FACTS[idx]}</div>
      <div className="ff-dots">
        {FACTS.map((_, i) => (
          <span key={i} className={`ff-dot${i === idx ? ' active' : ''}`} onClick={() => { setFade(false); setTimeout(() => { setIdx(i); setFade(true) }, 400) }}></span>
        ))}
      </div>
    </div>
  )
}

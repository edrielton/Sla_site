import { useState, useEffect } from 'react'

const FACTS = [
  { title: "Maracanã", category: "Estádio", years: "1950", emoji: "🏟️", image: "/img/maracan.jpg", text: "O Estádio Maracanã já recebeu mais de 1 milhão de pessoas em uma única Copa (1950)." },
  { title: "Pelé", category: "Lenda", years: "1958 • 1962 • 1970", emoji: "👑", image: "/img/pele.jpg", text: "Pelé é o único jogador a ganhar 3 Copas do Mundo (1958, 1962, 1970)." },
  { title: "Qatar 2022", category: "Copa", years: "2022", emoji: "💰", image: "/img/messi.jpg", text: "A Copa de 2022 no Qatar foi a mais cara da história, custando aproximadamente US$220 bilhões." },
  { title: "Maracanazo", category: "Final", years: "1950", emoji: "😱", image: "/img/maracana.jpg", text: "A final de 1950 entre Brasil e Uruguai teve quase 200 mil torcedores no Maracanã." },
  { title: "Just Fontaine", category: "Recorde", years: "1958", emoji: "🎯", image: "/img/fontaine.jpg", text: "Just Fontaine fez 13 gols em uma única Copa (1958), recorde que permanece." },
  { title: "Brasil", category: "Seleção", years: "1930 - Atual", emoji: "🇧🇷", image: "/img/bebeto.jpg", text: "O Brasil é o único país que participou de todas as Copas do Mundo." },
  { title: "Primeira Copa", category: "História", years: "1930", emoji: "📜", image: "/img/copa1930.jpg", text: "A Copa de 1930 teve apenas 13 seleções participantes." },
  { title: "Lucien Laurent", category: "História", years: "1930", emoji: "⚽", image: "/img/laurent.jpg", text: "O primeiro gol da história das Copas foi marcado por Lucien Laurent (França, 1930)." },
  { title: "Alemanha e Itália", category: "Títulos", years: "1934 - 2014", emoji: "🏆", image: "/img/buffon.jpg", text: "A Itália e a Alemanha possuem 4 títulos cada." },
  { title: "Cartão Vermelho", category: "Regras", years: "1970", emoji: "🟥", image: "/img/cartao.jpg", text: "O cartão vermelho foi introduzido apenas na Copa de 1970." },
  { title: "Impedimento", category: "Regras", years: "1990", emoji: "🚩", image: "/img/impedimento.jpg", text: "O impedimento foi abolido brevemente na Copa de 1990 e trouxe o futebol mais defensivo da história." },
  { title: "Inglaterra", category: "Campeã", years: "1966", emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", image: "/img/kane.jpg", text: "A Copa de 1966 foi a única em que a Inglaterra foi campeã, e foi jogando em casa." },
  { title: "Polvo Paul", category: "Curiosidade", years: "2010", emoji: "🐙", image: "/img/paul.jpg", text: "O polvo Paul acertou todos os resultados da Copa do Mundo de 2010." },
  { title: "Bola de Ouro", category: "Premiação", years: "1982", emoji: "🏅", image: "/img/bolaouro.jpg", text: "A Bola de Ouro da Copa é entregue desde 1982." },
  { title: "Zidane", category: "Final", years: "2006", emoji: "😤", image: "/img/zidane.jpg", text: "Zidane foi expulso na final de 2006 e mesmo assim ganhou a Bola de Ouro do torneio." }
]

export default function FunFacts() {
  const [idx, setIdx] = useState(0)
  const [fade, setFade] = useState(true)

  const next = () => {
    setFade(false)
    setTimeout(() => {
      setIdx(i => (i + 1) % FACTS.length)
      setFade(true)
    }, 400)
  }

  const goTo = (i) => {
    if (i === idx) return
    setFade(false)
    setTimeout(() => {
      setIdx(i)
      setFade(true)
    }, 400)
  }

  useEffect(() => {
    const interval = setInterval(next, 7000)
    return () => clearInterval(interval)
  }, [])

  const fact = FACTS[idx]

  return (
    <div className="fun-facts">
      <div className="ff-header">
        <div className="ff-title">
          <div className="ff-icon">⚽</div>
          <div>
            <h2>Curiosidades</h2>
            <span>Coisa que todo torcedor devia saber</span>
          </div>
        </div>
        <span className="ff-category">{fact.category}</span>
      </div>

      <div className={`ff-body${fade ? ' show' : ''}`}>
        <div className="ff-image">
          <img
            src={fact.image}
            alt={fact.title}
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          <div className="ff-img-fallback" style={{ display: 'none' }}>{fact.emoji}</div>
        </div>
        <div className="ff-content">
          <span className="ff-years">{fact.years}</span>
          <h1>{fact.title}</h1>
          <p>{fact.text}</p>
          <div className="ff-buttons">
            <button onClick={next}>Próxima →</button>
          </div>
        </div>
      </div>

      <div className="ff-footer">
        <div className="ff-dots">
          {FACTS.map((_, i) => (
            <span key={i} className={i === idx ? 'active' : ''} onClick={() => goTo(i)}></span>
          ))}
        </div>
      </div>

      <div className="ff-progress">
        <div className="ff-progress-bar" key={idx}></div>
      </div>
    </div>
  )
}

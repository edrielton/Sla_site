import { useState, useCallback } from 'react'
import { QUIZ } from '../data'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Quiz() {
  const [questions, setQuestions] = useState(() => shuffle(QUIZ).slice(0, 10))
  const [qIdx, setQIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [lastAnswer, setLastAnswer] = useState(null)

  const q = questions[qIdx]

  const init = useCallback(() => {
    setQuestions(shuffle(QUIZ).slice(0, 10))
    setQIdx(0)
    setScore(0)
    setAnswered(false)
    setShowResult(false)
    setLastAnswer(null)
  }, [])

  const answer = (i) => {
    if (answered) return
    setAnswered(true)
    setLastAnswer(i)
    if (i === q.c) setScore(s => s + 1)
  }

  const next = () => {
    if (qIdx + 1 >= questions.length) {
      setShowResult(true)
      return
    }
    setQIdx(idx => idx + 1)
    setAnswered(false)
    setLastAnswer(null)
  }

  const isCorrect = lastAnswer === q.c
  const msgs = ['Continue estudando! 📚', 'Bom começo! 📖', 'Você conhece o jogo! ⚽', 'Quase expert! 🌟', 'Expert em Copas! 🏆']

  return (
    <section id="quiz">
      <div className="wrap">
        <p className="sec-eyebrow">Teste seus conhecimentos</p>
        <h2 className="sec-title">QUIZ DA COPA</h2>
        <p className="sec-desc">10 perguntas sobre as Copas do Mundo. Quanto você sabe?</p>
        <div className="quiz-shell">
          {!showResult ? (
            <div id="qzContent">
              <div className="qz-prog">
                {questions.map((_, i) => (
                  <div key={i} className={`qz-dot${i < qIdx ? ' done' : i === qIdx ? ' cur' : ''}`}></div>
                ))}
              </div>
              <div className="qz-num">Pergunta {qIdx + 1} de {questions.length}</div>
              <div className="qz-q">{q.q}</div>
              <div className="qz-opts">
                {q.opts.map((o, i) => {
                  let cls = 'qo'
                  if (answered) {
                    if (i === q.c) cls += ' ok'
                    else if (i === lastAnswer && i !== q.c) cls += ' fail'
                    else cls += ' off'
                  }
                  return <button key={i} className={cls} onClick={() => answer(i)} disabled={answered}>{o}</button>
                })}
              </div>
              <div className={`qz-fb show ${answered ? (isCorrect ? 'ok' : 'fail') : ''}`}>
                {answered && (isCorrect ? `✅ Correto! ${q.ex}` : `❌ Incorreto. ${q.ex}`)}
              </div>
              {answered && <button className="qz-next show" onClick={next}>Próxima →</button>}
            </div>
          ) : (
            <div className="qz-result show">
              <div className="qz-big">{score}/{questions.length}</div>
              <div className="qz-msg">{msgs[Math.min(Math.floor(score / 2), 4)]}</div>
              <button className="qz-retry" onClick={init}>Jogar novamente ↺</button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

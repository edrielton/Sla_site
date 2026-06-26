import { useState, useCallback, lazy, Suspense } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import FunFacts from './components/FunFacts'
import IntroScreen from './components/IntroScreen'
import ScrollToTop from './components/ScrollToTop'
import ThemeToggle from './components/ThemeToggle'
import { ALL_PLAYERS } from './data'

const Timeline = lazy(() => import('./components/Timeline'))
const Records = lazy(() => import('./components/Records'))
const Legends = lazy(() => import('./components/Legends'))
const MVPSection = lazy(() => import('./components/MVPSection'))
const Comparador = lazy(() => import('./components/Comparador'))
const Stats = lazy(() => import('./components/Stats'))
const Quiz = lazy(() => import('./components/Quiz'))
const Footer = lazy(() => import('./components/Footer'))
const PlayerModal = lazy(() => import('./components/PlayerModal'))
const Favorites = lazy(() => import('./components/Favorites'))

const Fallback = () => <div style={{ minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--t3)' }}>Carregando…</div>

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const handleIntroComplete = useCallback(() => setIntroDone(true), [])

  const handlePlayerClick = (playerId, legendData) => {
    if (legendData) {
      setSelectedPlayer(legendData)
      return
    }
    if (playerId && ALL_PLAYERS[playerId]) {
      setSelectedPlayer(ALL_PLAYERS[playerId])
    }
  }

  return (
    <>
      {!introDone && <IntroScreen onComplete={handleIntroComplete} />}
      <Nav />
      <Hero />
      <FunFacts />
      <Suspense fallback={<Fallback />}>
        <Timeline onPlayerClick={handlePlayerClick} />
        <Records />
        <Legends onPlayerClick={handlePlayerClick} />
        <MVPSection />
        <Comparador />
        <Stats />
        <Quiz />
        <Footer />
      </Suspense>
      <ScrollToTop />
      <ThemeToggle />
      <Suspense fallback={null}>
        <Favorites onPlayerClick={handlePlayerClick} />
        {selectedPlayer && <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />}
      </Suspense>
    </>
  )
}

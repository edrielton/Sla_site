import { useState, useCallback } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import Legends from './components/Legends'
import Comparador from './components/Comparador'
import Quiz from './components/Quiz'
import Stats from './components/Stats'
import Footer from './components/Footer'
import PlayerModal from './components/PlayerModal'
import ScrollToTop from './components/ScrollToTop'
import ThemeToggle from './components/ThemeToggle'
import FunFacts from './components/FunFacts'
import MVPSection from './components/MVPSection'
import Records from './components/Records'
import Favorites from './components/Favorites'
import IntroScreen from './components/IntroScreen'
import { ALL_PLAYERS } from './data'

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
      <Timeline onPlayerClick={handlePlayerClick} />
      <Records />
      <Legends onPlayerClick={handlePlayerClick} />
      <MVPSection />
      <Comparador />
      <Stats />
      <Quiz />
      <Footer />
      <ScrollToTop />
      <ThemeToggle />
      <Favorites onPlayerClick={handlePlayerClick} />
      {selectedPlayer && <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />}
    </>
  )
}

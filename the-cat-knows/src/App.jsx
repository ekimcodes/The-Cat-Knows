import { useState } from 'react'
import GameCanvas from './components/GameCanvas'
import TitleScreen from './components/UI/TitleScreen'
import GameOverScreen from './components/UI/GameOverScreen'

function App() {
  const [gameState, setGameState] = useState('title') // title, playing, summary
  const [lastStats, setLastStats] = useState({ score: 0, time: 0 })

  const handleEndGame = (stats) => {
    setLastStats(stats);
    setGameState('summary');
  };

  const handleStartGame = () => {
    setGameState('playing');
  };

  return (
    <div className="w-screen h-screen bg-stone-100 overflow-hidden relative select-none font-sans">
      {gameState === 'title' && (
        <TitleScreen onStart={handleStartGame} />
      )}

      {gameState === 'playing' && (
        <div className="w-full h-full relative">
          <GameCanvas onEndGame={handleEndGame} />
        </div>
      )}

      {gameState === 'summary' && (
        <GameOverScreen
          score={lastStats.score}
          time={lastStats.time}
          onRestart={handleStartGame}
        />
      )}
    </div>
  )
}

export default App

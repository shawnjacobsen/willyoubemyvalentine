import { useState, useEffect } from 'react'
import './App.css'
import { EASTER_EGG_MESSAGES } from './data/easterEggMessages'
import { CELEBRATION_GIFS } from './data/celebrationGifs'

function App() {
  const [accepted, setAccepted] = useState(false)
  const [noButtonPosition, setNoButtonPosition] = useState(null)
  const [isNoButtonMoving, setIsNoButtonMoving] = useState(false)
  const [name, setName] = useState('')
  const [noClickCount, setNoClickCount] = useState(0)
  const [easterEggMessage, setEasterEggMessage] = useState('')
  const [celebrationGif, setCelebrationGif] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const nameParam = params.get('name')
    if (nameParam) {
      setName(nameParam)
    }
  }, [])

  useEffect(() => {
    if (noClickCount >= 3) {
      const randomMessage = EASTER_EGG_MESSAGES[Math.floor(Math.random() * EASTER_EGG_MESSAGES.length)]
      setEasterEggMessage(randomMessage)
    }
  }, [noClickCount])

  useEffect(() => {
    if (accepted) {
      const randomGif = CELEBRATION_GIFS[Math.floor(Math.random() * CELEBRATION_GIFS.length)]
      setCelebrationGif(randomGif)
    }
  }, [accepted])

  const handleYesClick = () => {
    setAccepted(true)
  }

  const handleNoClick = () => {
    setIsNoButtonMoving(true)
    setNoClickCount(prev => prev + 1)

    // Generate a position that avoids the center area
    let randomTop, randomLeft
    let isInSafeZone = false

    // Adjust danger zone based on screen size
    const isMobile = window.innerWidth <= 768
    const centerLeft = 50
    const centerTop = 50
    const dangerZoneWidth = isMobile ? 45 : 35 // Wider danger zone on mobile
    const dangerZoneHeight = isMobile ? 50 : 40 // Taller danger zone on mobile

    // Keep generating positions until we find one outside the danger zone
    while (!isInSafeZone) {
      randomTop = Math.floor(Math.random() * 80) + 10
      randomLeft = Math.floor(Math.random() * 80) + 10

      // Check if position is outside the center danger zone
      const isOutsideHorizontal = randomLeft < (centerLeft - dangerZoneWidth / 2) ||
                                   randomLeft > (centerLeft + dangerZoneWidth / 2)
      const isOutsideVertical = randomTop < (centerTop - dangerZoneHeight / 2) ||
                                 randomTop > (centerTop + dangerZoneHeight / 2)

      // Safe if outside either horizontally or vertically (doesn't have to be both)
      isInSafeZone = isOutsideHorizontal || isOutsideVertical
    }

    setNoButtonPosition({
      top: `${randomTop}%`,
      left: `${randomLeft}%`
    })
  }

  if (accepted) {
    return (
      <div className="celebration">
        <div className="hearts-container">
          <div className="heart heart1">❤️</div>
          <div className="heart heart2">💕</div>
          <div className="heart heart3">💖</div>
          <div className="heart heart4">💗</div>
          <div className="heart heart5">💝</div>
          <div className="heart heart6">❤️</div>
        </div>
        <h1 className="celebration-text">Yay! 🎉</h1>
        <p className="celebration-message">I knew you'd say yes! 💕</p>
        {celebrationGif && (
          <img
            src={celebrationGif}
            alt="Celebration"
            className="celebration-gif"
          />
        )}
        <div className="credit">
          created by <a href="https://github.com/shawnjacobsen" target="_blank" rel="noopener noreferrer">shawn jacobsen</a>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <h1 className="question">
        Will you be my Valentine{name ? `, ${name}` : ''}? 💝
      </h1>
      <div className="buttons-container">
        <button className="yes-button" onClick={handleYesClick}>
          Yes! 💖
        </button>
        <button
          className={`no-button ${isNoButtonMoving ? 'moving' : ''}`}
          style={isNoButtonMoving ? {
            top: noButtonPosition.top,
            left: noButtonPosition.left,
          } : {}}
          onClick={handleNoClick}
        >
          No
        </button>
      </div>
      <div className="credit">
        created by <a href="https://github.com/shawnjacobsen" target="_blank" rel="noopener noreferrer">shawn jacobsen</a>
      </div>
      {noClickCount >= 3 && (
        <div className="easter-egg">
          {easterEggMessage}
        </div>
      )}
    </div>
  )
}

export default App

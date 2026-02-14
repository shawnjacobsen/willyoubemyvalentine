import { useState, useEffect } from 'react'
import './App.css'
import { REJECTION_MESSAGES } from './data/rejectionMessages'
import { CELEBRATION_GIFS } from './data/celebrationGifs'

function App() {
  const [accepted, setAccepted] = useState(false)
  const [noButtonPosition, setNoButtonPosition] = useState(null)
  const [isNoButtonMoving, setIsNoButtonMoving] = useState(false)
  const [name, setName] = useState('')
  const [noClickCount, setNoClickCount] = useState(0)
  const [rejectionMessage, setRejectionMessage] = useState('')
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
      const randomMessage = REJECTION_MESSAGES[Math.floor(Math.random() * REJECTION_MESSAGES.length)]
      setRejectionMessage(randomMessage)
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

    let randomTop, randomLeft
    let isInSafeZone = false

    const isMobile = window.innerWidth <= 768

    if (isMobile) {
      // Mobile: Keep button in lower portion (below all elements)
      // All content (header, rejection message, Yes button) is in upper 60%
      while (!isInSafeZone) {
        randomTop = Math.floor(Math.random() * 25) + 60 // 60-85% from top
        randomLeft = Math.floor(Math.random() * 80) + 10 // 10-90% from left

        // Avoid bottom credit area
        const isAboveCredit = randomTop < 85

        isInSafeZone = isAboveCredit
      }
    } else {
      // Desktop: Avoid center exclusion zone (where Yes button and rejection message are)
      const centerLeft = 50
      const centerTop = 50
      const exclusionWidth = 55
      const exclusionHeight = 55

      while (!isInSafeZone) {
        randomTop = Math.floor(Math.random() * 80) + 10 // 10-90% from top
        randomLeft = Math.floor(Math.random() * 80) + 10 // 10-90% from left

        // Check if outside center exclusion zone
        const isOutsideHorizontal = randomLeft < (centerLeft - exclusionWidth / 2) ||
                                     randomLeft > (centerLeft + exclusionWidth / 2)
        const isOutsideVertical = randomTop < (centerTop - exclusionHeight / 2) ||
                                   randomTop > (centerTop + exclusionHeight / 2)

        // Safe if outside either horizontally OR vertically
        isInSafeZone = isOutsideHorizontal || isOutsideVertical
      }
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
        <div className="rejection-message">
          {rejectionMessage}
        </div>
      )}
    </div>
  )
}

export default App

import { useState, useEffect } from 'react'
import './App.css'

const EASTER_EGG_MESSAGES = [
  "My heart is breaking in real time...",
  "I spent 1 whole hour making this for you 🥺",
  "Fun fact: 9 out of 10 dentists recommend saying yes",
  "The 'No' button is getting a workout. Unlike our future date plans. 😔",
  "At this point you're just playing with the button aren't you",
  "We both know how this ends... just say yes 😌",
  "Wow, you're pretty serious about this, huh?",
  "I admire your commitment to avoiding happiness",
  "Impressive dedication to breaking my heart, truly",
  "You've put more effort into saying no than most people put into their careers"
]

const CELEBRATION_GIFS = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDlueXJ3MzN6NmFucWRuZXB2NXBseG5qN3NldmtrbDdwMWM2cTJzbiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/QAB3dfWbviuR0iIC1T/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGc2aDR0MXhtc2JwdjNzNmgxMmszNjAxNDd3eHhoMGZpNml2cDF1dCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/NxC8VtyxqhMtpLoEEN/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGc2aDR0MXhtc2JwdjNzNmgxMmszNjAxNDd3eHhoMGZpNml2cDF1dCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/D9j761FH8SYJLyW9WO/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MDFhY2N2d3ZjNnhkYjl1bndvbXdnb283eDdrYzdzM3JtN3N0ZnAzeSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/qKQQUKSSbWBkO2V3KX/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NHUzNnR5bXB1djM4aXR4Z3l3YnFlZWRweXJtZDNyNHZjank4YnJvaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JSIe9fm21lIursagnk/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dDQyNnNvZTdyczA1NHdzeTJuODVuZ282djlrcWZnN3NxNW1qNDdpdCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/H8KHWylNnghz5NbzPk/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExemR1c3liZWZudmQyNGJxZ25kbTViN3Rlc2s3eGhjcjk5dHVoeHp5MiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/MDJ9IbxxvDUQM/giphy.gif"
]

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

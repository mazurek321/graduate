import React, { useState, useEffect } from 'react'
import engineer from "../assets/achievement.webp"
import fireworkGif from "../assets/firework.gif"

const Home = () => {
  const [gifPositions, setGifPositions] = useState([])

  useEffect(() => {
    const createFirework = () => {
      const count = Math.floor(Math.random() * 4) + 1
      const duration = 1000

      const newGifs = Array.from({ length: count }).map(() => {
        const id = Date.now() + Math.random()
        setTimeout(() => {
          setGifPositions(prev => prev.filter(gif => gif.id !== id))
        }, duration)
        return {
          id,
          top: Math.random() * 90 + '%',
          left: Math.random() * 90 + '%',
        }
      })

      setGifPositions(prev => [...prev, ...newGifs])

      const nextTime = Math.random() * 4000 + 1000
      setTimeout(createFirework, nextTime)
    }

    createFirework()
  }, [])

  return (
    <div className="home-container">
      <h1 className="home-title">2026 Inżynier</h1>
      <img src={engineer} alt="Achievement Made" className="achievement-image" />
      <div className="fireworks-container">
        {Array.from({ length: 7 }).map((_, i) => (
          <span key={i} className={`firework firework-${i + 1}`}></span>
        ))}
        {gifPositions.map(gif => (
          <img
            key={gif.id}
            src={fireworkGif}
            alt="firework gif"
            className="firework-gif"
            style={{ top: gif.top, left: gif.left }}
          />
        ))}
      </div>
    </div>
  )
}

export default Home

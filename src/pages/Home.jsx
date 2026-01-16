import React, { useState, useEffect } from 'react'
import engineer from "../assets/image-removebg-preview.png"
import txtdec from "../assets/image.png"
import fireworkGif from "../assets/firework.gif"

const Home = () => {
  const [gifPositions, setGifPositions] = useState([])
  const GIF_DURATION = 2000 

  const addFireworkAtLocation = (x, y) => {
    const id = Date.now() + Math.random()
    const newGif = {
      id,
      top: `${y}px`,
      left: `${x}px`,
      transform: 'translate(-50%, -50%)'
    }

    setGifPositions(prev => [...prev, newGif])

    setTimeout(() => {
      setGifPositions(prev => prev.filter(gif => gif.id !== id))
    }, GIF_DURATION)
  }

  const handleInteraction = (e) => {
    const x = e.clientX || (e.touches && e.touches[0].clientX)
    const y = e.clientY || (e.touches && e.touches[0].clientY)
    
    if (x && y) {
      addFireworkAtLocation(x, y)
    }
  }

  useEffect(() => {
    const createRandomFirework = () => {
      const id = Date.now() + Math.random()
      const newGif = {
        id,
        top: Math.random() * 80 + 10 + '%',
        left: Math.random() * 80 + 10 + '%',
      }

      setGifPositions(prev => [...prev, newGif])

      setTimeout(() => {
        setGifPositions(prev => prev.filter(gif => gif.id !== id))
      }, GIF_DURATION)

      const nextTime = Math.random() * 3000 + 1500
      return setTimeout(createRandomFirework, nextTime)
    }

    const timer = createRandomFirework()
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="home-container" onClick={handleInteraction}>
      <div className="background"></div>
      
      <h1 className="home-title">
        <img src={txtdec} className="textdec" alt="decoration" />
        2026
        <img src={txtdec} className="textdec" alt="decoration" />
      </h1>

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
            style={{ 
              top: gif.top, 
              left: gif.left, 
              transform: gif.transform || 'none' 
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
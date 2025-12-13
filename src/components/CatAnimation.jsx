import { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import './CatAnimation.css'

const CatAnimation = () => {
  const { theme } = useTheme()
  const [cats, setCats] = useState([])

  useEffect(() => {
    // Создаем несколько котиков
    const newCats = []
    for (let i = 0; i < 3; i++) {
      newCats.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        speed: 0.5 + Math.random() * 0.5
      })
    }
    setCats(newCats)
  }, [])

  return (
    <div className="cat-animation-container">
      {cats.map(cat => (
        <div
          key={cat.id}
          className={`floating-cat ${theme}`}
          style={{
            left: `${cat.x}%`,
            top: `${cat.y}%`,
            animationDelay: `${cat.delay}s`,
            animationDuration: `${3 + cat.speed}s`
          }}
        >
          🐱
        </div>
      ))}
    </div>
  )
}

export default CatAnimation


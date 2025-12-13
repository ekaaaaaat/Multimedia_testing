import { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { useAnimation } from '../contexts/AnimationContext'
import CatIcon from './CatIcon'
import './CatAnimation.css'

const CatAnimation = () => {
  const { theme } = useTheme()
  const { animationsEnabled } = useAnimation()
  const [cats, setCats] = useState([])

  useEffect(() => {
    if (animationsEnabled) {
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
    } else {
      setCats([])
    }
  }, [animationsEnabled])

  if (!animationsEnabled) {
    return null
  }

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
          <CatIcon variant={cat.id % 5} size="2.5rem" />
        </div>
      ))}
    </div>
  )
}

export default CatAnimation


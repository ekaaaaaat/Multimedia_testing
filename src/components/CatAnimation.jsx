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
      // Создаем больше котиков для более оживленной анимации
      const newCats = []
      const catCount = 8 // Увеличено количество котиков
      for (let i = 0; i < catCount; i++) {
        newCats.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 5,
          speed: 0.5 + Math.random() * 0.5,
          size: 2 + Math.random() * 1.5 // Разный размер для разнообразия
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
          <CatIcon variant={cat.id % 5} size={`${cat.size}rem`} />
        </div>
      ))}
    </div>
  )
}

export default CatAnimation


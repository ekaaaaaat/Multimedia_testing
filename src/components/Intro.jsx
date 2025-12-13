import { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import './Intro.css'

const Intro = ({ onComplete }) => {
  const { theme } = useTheme()
  const [stage, setStage] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [placedItems, setPlacedItems] = useState([])

  const contentItems = [
    { id: 1, emoji: '📚', position: { top: '20%', left: '15%' } },
    { id: 2, emoji: '🎥', position: { top: '20%', right: '15%' } },
    { id: 3, emoji: '📝', position: { bottom: '20%', left: '20%' } },
    { id: 4, emoji: '🎮', position: { bottom: '20%', right: '20%' } },
    { id: 5, emoji: '🎵', position: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' } }
  ]

  useEffect(() => {
    if (stage === 0) {
      // Показываем кота
      const timer = setTimeout(() => setStage(1), 500)
      return () => clearTimeout(timer)
    } else if (stage === 1) {
      // Левая лапа размещает первый элемент
      const timer = setTimeout(() => {
        setPlacedItems([contentItems[0]])
        setStage(2)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (stage === 2) {
      // Правая лапа размещает второй элемент
      const timer = setTimeout(() => {
        setPlacedItems(prev => [...prev, contentItems[1]])
        setStage(3)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (stage === 3) {
      // Левая лапа размещает третий элемент
      const timer = setTimeout(() => {
        setPlacedItems(prev => [...prev, contentItems[2]])
        setStage(4)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (stage === 4) {
      // Правая лапа размещает четвертый элемент
      const timer = setTimeout(() => {
        setPlacedItems(prev => [...prev, contentItems[3]])
        setStage(5)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (stage === 5) {
      // Кот размещает последний элемент в центре
      const timer = setTimeout(() => {
        setPlacedItems(prev => [...prev, contentItems[4]])
        setStage(6)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (stage === 6) {
      // Показываем все элементы и завершаем
      const timer = setTimeout(() => {
        setShowContent(true)
        setTimeout(() => {
          onComplete()
        }, 1500)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [stage, onComplete])

  return (
    <div className={`intro-overlay ${theme} ${showContent ? 'fade-out' : ''}`}>
      <div className="intro-container">
        <div className="cat-intro">
          <div className={`cat-paw left-paw stage-${stage}`}>
            <div className="paw-print">🐾</div>
          </div>
          <div className={`cat-paw right-paw stage-${stage}`}>
            <div className="paw-print">🐾</div>
          </div>
          <div className={`cat-face stage-${stage}`}>
            <div className="cat-emoji">🐱</div>
          </div>
        </div>
        
        <div className={`intro-content stage-${stage >= 1 ? '1' : '0'}`}>
          <h1 className="intro-title">Добро пожаловать! 🐱</h1>
          <p className="intro-text">Кот размещает контент лапками...</p>
        </div>

        {/* Элементы, которые кот размещает лапами */}
        {placedItems.map((item, index) => (
          <div
            key={item.id}
            className={`content-item-placed item-${item.id}`}
            style={item.position}
          >
            <div className="content-emoji">{item.emoji}</div>
            <div className="paw-mark">🐾</div>
          </div>
        ))}

        {/* Все элементы в конце */}
        {showContent && (
          <div className="content-appearing">
            <div className="content-item">📚</div>
            <div className="content-item">🎥</div>
            <div className="content-item">📝</div>
            <div className="content-item">🎮</div>
            <div className="content-item">🎵</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Intro


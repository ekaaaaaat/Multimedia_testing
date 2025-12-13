import { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import './Intro.css'

const Intro = ({ onComplete }) => {
  const { theme } = useTheme()
  const [stage, setStage] = useState(0)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (stage < 3) {
        setStage(stage + 1)
      } else {
        setShowContent(true)
        setTimeout(() => {
          onComplete()
        }, 1000)
      }
    }, 1500)

    return () => clearTimeout(timer)
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
        
        <div className={`intro-content stage-${stage}`}>
          <h1 className="intro-title">Добро пожаловать!</h1>
          <p className="intro-text">Кот готовит для вас контент...</p>
        </div>

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


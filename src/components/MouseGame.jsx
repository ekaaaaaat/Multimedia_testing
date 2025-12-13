import { useState, useEffect, useCallback } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import CatIcon from './CatIcon'
import mouseIcon from '../assets/Icons/mouse-svgrepo-com.svg'
import './MouseGame.css'

const GAME_DURATION = 30 // секунды
const MOUSE_SPAWN_INTERVAL = 1000 // миллисекунды
const MOUSE_LIFETIME = 2000 // сколько живет мышь до исчезновения

const MouseGame = () => {
  const { theme } = useTheme()
  const [isStarted, setIsStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [mice, setMice] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [missed, setMissed] = useState(0)

  // Генерация случайной позиции для мыши
  const generateRandomPosition = useCallback(() => {
    const containerWidth = 600 // ширина игрового поля
    const containerHeight = 400 // высота игрового поля
    const mouseSize = 60 // размер мыши
    
    return {
      x: Math.random() * (containerWidth - mouseSize),
      y: Math.random() * (containerHeight - mouseSize),
      id: Date.now() + Math.random()
    }
  }, [])

  // Спавн новой мыши
  useEffect(() => {
    if (!isStarted || gameOver) return

    const spawnInterval = setInterval(() => {
      setMice(prev => [...prev, generateRandomPosition()])
    }, MOUSE_SPAWN_INTERVAL)

    return () => clearInterval(spawnInterval)
  }, [isStarted, gameOver, generateRandomPosition])

  // Удаление мышей по истечении времени жизни
  useEffect(() => {
    if (!isStarted || gameOver) return

    const cleanupInterval = setInterval(() => {
      setMice(prev => {
        const now = Date.now()
        return prev.filter(mouse => {
          const mouseAge = now - mouse.id
          if (mouseAge > MOUSE_LIFETIME) {
            setMissed(prev => prev + 1)
            return false
          }
          return true
        })
      })
    }, 100)

    return () => clearInterval(cleanupInterval)
  }, [isStarted, gameOver])

  // Таймер игры
  useEffect(() => {
    if (!isStarted || gameOver) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isStarted, gameOver])

  // Обработка клика по мыши
  const handleMouseClick = (mouseId) => {
    if (gameOver) return
    
    setMice(prev => prev.filter(mouse => mouse.id !== mouseId))
    setScore(prev => prev + 10)
  }

  // Начало игры
  const startGame = () => {
    setIsStarted(true)
    setGameOver(false)
    setScore(0)
    setTimeLeft(GAME_DURATION)
    setMice([])
    setMissed(0)
  }

  // Перезапуск игры
  const resetGame = () => {
    setIsStarted(false)
    setGameOver(false)
    setScore(0)
    setTimeLeft(GAME_DURATION)
    setMice([])
    setMissed(0)
  }

  return (
    <div className={`mouse-game-container ${theme}`}>
      {!isStarted ? (
        <div className="game-start-screen">
          <div className="start-screen-content">
            <h2>Готовы начать игру? <CatIcon variant={0} size="1.5em" /></h2>
            <p>Кликайте по мышкам, которые появляются на экране!</p>
            <p>У вас есть {GAME_DURATION} секунд, чтобы поймать как можно больше мышек</p>
            <button className="start-game-button" onClick={startGame}>
              ▶️ Начать игру
            </button>
          </div>
        </div>
      ) : (
        <div className="game-content">
          <div className="game-header">
            <div className="game-stats">
              <div className="stat-item">
                <span className="stat-label">Очки:</span>
                <span className="stat-value">{score}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Время:</span>
                <span className="stat-value">{timeLeft}с</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Пропущено:</span>
                <span className="stat-value">{missed}</span>
              </div>
            </div>
          </div>

          <div className="game-board-wrapper">
            <div className="game-board" onClick={(e) => {
              // Если клик не по мыши, ничего не делаем
              if (e.target === e.currentTarget) {
                // Можно добавить штраф за клик мимо, но пока оставим так
              }
            }}>
              {mice.map(mouse => (
                <div
                  key={mouse.id}
                  className="mouse"
                  style={{
                    left: `${mouse.x}px`,
                    top: `${mouse.y}px`,
                    position: 'absolute'
                  }}
                  onClick={() => handleMouseClick(mouse.id)}
                >
                  <img 
                    src={mouseIcon} 
                    alt="Mouse" 
                    className="mouse-icon"
                  />
                </div>
              ))}
            </div>
          </div>

          {gameOver && (
            <div className="game-over-overlay">
              <div className="game-over-content">
                <h2>Игра окончена! <CatIcon variant={2} size="1.5em" /></h2>
                <div className="final-stats">
                  <p>Ваш счет: <strong>{score}</strong></p>
                  <p>Поймано мышек: <strong>{Math.floor(score / 10)}</strong></p>
                  <p>Пропущено: <strong>{missed}</strong></p>
                </div>
                <button className="restart-button" onClick={resetGame}>
                  Играть снова
                </button>
              </div>
            </div>
          )}

          <div className="game-footer">
            <button className="reset-button" onClick={resetGame}>
              ↻ Начать заново
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MouseGame


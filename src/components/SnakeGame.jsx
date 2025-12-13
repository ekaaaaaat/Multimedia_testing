import { useState, useEffect, useCallback, useRef } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import CatIcon from './CatIcon'
import './SnakeGame.css'

const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_DIRECTION = { x: 1, y: 0 }
const GAME_SPEED = 150

const SnakeGame = () => {
  const { theme } = useTheme()
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [food, setFood] = useState({ x: 15, y: 15 })
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const directionRef = useRef(INITIAL_DIRECTION)
  const gameLoopRef = useRef(null)

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    }
    return newFood
  }, [])

  const checkCollision = useCallback((head) => {
    // Проверка столкновения со стенами
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true
    }
    // Проверка столкновения с собой
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true
      }
    }
    return false
  }, [snake])

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return

    setSnake(prevSnake => {
      const head = { ...prevSnake[0] }
      head.x += directionRef.current.x
      head.y += directionRef.current.y

      if (checkCollision(head)) {
        setGameOver(true)
        return prevSnake
      }

      const newSnake = [head, ...prevSnake]

      // Проверка поедания еды
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10)
        const newFood = generateFood()
        // Убеждаемся, что еда не появилась на змейке
        let foodOnSnake = newSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)
        while (foodOnSnake) {
          const anotherFood = generateFood()
          newFood.x = anotherFood.x
          newFood.y = anotherFood.y
          foodOnSnake = newSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)
        }
        setFood(newFood)
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [food, gameOver, isPaused, checkCollision, generateFood])

  useEffect(() => {
    if (!gameOver && !isPaused) {
      gameLoopRef.current = setInterval(moveSnake, GAME_SPEED)
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [moveSnake, gameOver, isPaused])

  const handleKeyPress = useCallback((e) => {
    if (gameOver) return

    const key = e.key
    const newDirection = { ...directionRef.current }

    switch (key) {
      case 'ArrowUp':
        if (directionRef.current.y === 0) {
          newDirection.x = 0
          newDirection.y = -1
        }
        break
      case 'ArrowDown':
        if (directionRef.current.y === 0) {
          newDirection.x = 0
          newDirection.y = 1
        }
        break
      case 'ArrowLeft':
        if (directionRef.current.x === 0) {
          newDirection.x = -1
          newDirection.y = 0
        }
        break
      case 'ArrowRight':
        if (directionRef.current.x === 0) {
          newDirection.x = 1
          newDirection.y = 0
        }
        break
      case ' ':
        e.preventDefault()
        setIsPaused(prev => !prev)
        return
      default:
        return
    }

    directionRef.current = newDirection
    setDirection(newDirection)
  }, [gameOver])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setFood(generateFood())
    setDirection(INITIAL_DIRECTION)
    directionRef.current = INITIAL_DIRECTION
    setGameOver(false)
    setScore(0)
    setIsPaused(false)
  }

  return (
    <div className={`snake-game-container ${theme}`}>
      <div className="game-header">
        <div className="game-score">
          <span>Очки: <strong>{score}</strong></span>
        </div>
        <div className="game-controls-info">
          <span>Управление: ← → ↑ ↓ | Пауза: Пробел</span>
        </div>
      </div>

      <div className="game-board-wrapper">
        <div 
          className="game-board"
          style={{
            width: `${GRID_SIZE * CELL_SIZE}px`,
            height: `${GRID_SIZE * CELL_SIZE}px`
          }}
        >
          {/* Еда */}
          <div
            className="food"
            style={{
              left: `${food.x * CELL_SIZE}px`,
              top: `${food.y * CELL_SIZE}px`,
              width: `${CELL_SIZE}px`,
              height: `${CELL_SIZE}px`
            }}
          >
            <CatIcon variant={0} size="1em" />
          </div>

          {/* Змейка */}
          {snake.map((segment, index) => (
            <div
              key={index}
              className={`snake-segment ${index === 0 ? 'head' : ''}`}
              style={{
                left: `${segment.x * CELL_SIZE}px`,
                top: `${segment.y * CELL_SIZE}px`,
                width: `${CELL_SIZE}px`,
                height: `${CELL_SIZE}px`
              }}
            >
              {index === 0 && <CatIcon variant={1} size="0.8em" />}
            </div>
          ))}
        </div>
      </div>

      {gameOver && (
        <div className="game-over-overlay">
          <div className="game-over-content">
            <h2>Игра окончена! <CatIcon variant={2} size="1.5em" /></h2>
            <p>Ваш счет: <strong>{score}</strong></p>
            <button className="restart-button" onClick={resetGame}>
              Играть снова
            </button>
          </div>
        </div>
      )}

      {isPaused && !gameOver && (
        <div className="pause-overlay">
          <div className="pause-content">
            <h3>Пауза</h3>
            <p>Нажмите Пробел для продолжения</p>
          </div>
        </div>
      )}

      <div className="game-footer">
        <button className="reset-button" onClick={resetGame}>
          ↻ Начать заново
        </button>
        <button 
          className="pause-button" 
          onClick={() => setIsPaused(prev => !prev)}
          disabled={gameOver}
        >
          {isPaused ? '▶️ Продолжить' : '⏸️ Пауза'}
        </button>
      </div>
    </div>
  )
}

export default SnakeGame


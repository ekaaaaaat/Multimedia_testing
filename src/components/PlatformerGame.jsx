import { useState, useEffect, useCallback, useRef } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import CatIcon from './CatIcon'
import './PlatformerGame.css'

const GAME_WIDTH = 800
const GAME_HEIGHT = 400
const GROUND_HEIGHT = 50
const PLAYER_WIDTH = 40
const PLAYER_HEIGHT = 50
const OBSTACLE_WIDTH = 30
const OBSTACLE_HEIGHT = 60
const GRAVITY = 0.8
const JUMP_STRENGTH = -15
const INITIAL_SPEED = 3
const SPEED_INCREMENT = 0.001

const PlatformerGame = () => {
  const { theme } = useTheme()
  const [player, setPlayer] = useState({
    x: 100,
    y: GAME_HEIGHT - GROUND_HEIGHT - PLAYER_HEIGHT,
    velocityY: 0,
    isJumping: false
  })
  const [obstacles, setObstacles] = useState([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const gameSpeedRef = useRef(INITIAL_SPEED)
  const gameLoopRef = useRef(null)
  const obstacleSpawnTimerRef = useRef(null)
  const gameContainerRef = useRef(null)
  const playerRef = useRef({
    x: 100,
    y: GAME_HEIGHT - GROUND_HEIGHT - PLAYER_HEIGHT,
    velocityY: 0,
    isJumping: false
  })

  const spawnObstacle = useCallback(() => {
    setObstacles(prev => {
      const newObstacle = {
        id: Date.now() + Math.random(), // Уникальный ID
        x: GAME_WIDTH,
        y: GAME_HEIGHT - GROUND_HEIGHT - OBSTACLE_HEIGHT,
        width: OBSTACLE_WIDTH,
        height: OBSTACLE_HEIGHT
      }
      return [...prev, newObstacle]
    })
  }, [])

  const checkCollision = useCallback((playerRect, obstacleRect) => {
    return (
      playerRect.x < obstacleRect.x + obstacleRect.width &&
      playerRect.x + playerRect.width > obstacleRect.x &&
      playerRect.y < obstacleRect.y + obstacleRect.height &&
      playerRect.y + playerRect.height > obstacleRect.y
    )
  }, [])

  const updateGame = useCallback(() => {
    if (gameOver || isPaused || !isStarted) return

    // Обновление позиции игрока
    setPlayer(prevPlayer => {
      let newY = prevPlayer.y + prevPlayer.velocityY
      let newVelocityY = prevPlayer.velocityY + GRAVITY
      const groundY = GAME_HEIGHT - GROUND_HEIGHT - PLAYER_HEIGHT
      let isJumping = prevPlayer.isJumping

      // Проверка приземления
      if (newY >= groundY) {
        newY = groundY
        newVelocityY = 0
        isJumping = false
      }

      const updatedPlayer = {
        ...prevPlayer,
        y: newY,
        velocityY: newVelocityY,
        isJumping
      }

      // Обновляем ref для использования в проверке столкновений
      playerRef.current = updatedPlayer

      return updatedPlayer
    })

    // Обновление препятствий и проверка столкновений
    setObstacles(prevObstacles => {
      // Обновляем позиции препятствий
      const updatedObstacles = prevObstacles
        .map(obstacle => ({
          ...obstacle,
          x: obstacle.x - gameSpeedRef.current
        }))
        .filter(obstacle => obstacle.x + obstacle.width > -50)

      // Проверка столкновений с текущим игроком из ref
      const currentPlayer = playerRef.current
      const playerRect = {
        x: currentPlayer.x,
        y: currentPlayer.y,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT
      }

      const collision = updatedObstacles.some(obstacle => {
        const obstacleRect = {
          x: obstacle.x,
          y: obstacle.y,
          width: obstacle.width,
          height: obstacle.height
        }
        return checkCollision(playerRect, obstacleRect)
      })

      if (collision) {
        setGameOver(true)
        return updatedObstacles
      }

      // Увеличение счета за успешно пройденные препятствия
      const passedObstacles = updatedObstacles.filter(
        obstacle => obstacle.x + obstacle.width < currentPlayer.x
      )
      if (passedObstacles.length > 0) {
        setScore(prevScore => prevScore + passedObstacles.length)
        return updatedObstacles.filter(
          obstacle => obstacle.x + obstacle.width >= currentPlayer.x
        )
      }

      return updatedObstacles
    })

    // Увеличение скорости
    gameSpeedRef.current += SPEED_INCREMENT
  }, [gameOver, isPaused, isStarted, checkCollision])

  // Игровой цикл
  useEffect(() => {
    if (isStarted && !gameOver && !isPaused) {
      gameLoopRef.current = requestAnimationFrame(function gameLoop() {
        updateGame()
        gameLoopRef.current = requestAnimationFrame(gameLoop)
      })
    } else {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
        gameLoopRef.current = null
      }
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [isStarted, gameOver, isPaused, updateGame])

  // Таймер для создания препятствий
  useEffect(() => {
    if (!isStarted || gameOver || isPaused) {
      if (obstacleSpawnTimerRef.current) {
        clearInterval(obstacleSpawnTimerRef.current)
        obstacleSpawnTimerRef.current = null
      }
      return
    }

    // Первое препятствие через 1.5 секунды
    const firstTimeout = setTimeout(() => {
      spawnObstacle()
    }, 1500)

    // Затем создаем препятствия с фиксированным интервалом (упрощенная версия)
    const intervalTimeout = setTimeout(() => {
      obstacleSpawnTimerRef.current = setInterval(() => {
        spawnObstacle()
      }, 2000) // Фиксированный интервал 2 секунды
    }, 1500)

    return () => {
      clearTimeout(firstTimeout)
      clearTimeout(intervalTimeout)
      if (obstacleSpawnTimerRef.current) {
        clearInterval(obstacleSpawnTimerRef.current)
        obstacleSpawnTimerRef.current = null
      }
    }
  }, [isStarted, gameOver, isPaused, spawnObstacle])

  const handleJump = useCallback(() => {
    if (gameOver || !isStarted || isPaused) return

    setPlayer(prev => {
      if (!prev.isJumping) {
        return {
          ...prev,
          velocityY: JUMP_STRENGTH,
          isJumping: true
        }
      }
      return prev
    })
  }, [gameOver, isStarted, isPaused])

  const handleKeyPress = useCallback((e) => {
    if (e.code === 'Space' || e.key === 'ArrowUp' || e.key === ' ') {
      e.preventDefault()
      if (!isStarted) {
        setIsStarted(true)
      } else {
        handleJump()
      }
    } else if (e.key === 'p' || e.key === 'P') {
      setIsPaused(prev => !prev)
    }
  }, [isStarted, handleJump])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  const handleStart = () => {
    setIsStarted(true)
    setGameOver(false)
    setScore(0)
    const initialPlayer = {
      x: 100,
      y: GAME_HEIGHT - GROUND_HEIGHT - PLAYER_HEIGHT,
      velocityY: 0,
      isJumping: false
    }
    setPlayer(initialPlayer)
    playerRef.current = initialPlayer
    setObstacles([])
    gameSpeedRef.current = INITIAL_SPEED
  }

  const handleRestart = () => {
    setIsStarted(false)
    setGameOver(false)
    setScore(0)
    const initialPlayer = {
      x: 100,
      y: GAME_HEIGHT - GROUND_HEIGHT - PLAYER_HEIGHT,
      velocityY: 0,
      isJumping: false
    }
    setPlayer(initialPlayer)
    playerRef.current = initialPlayer
    setObstacles([])
    gameSpeedRef.current = INITIAL_SPEED
  }

  return (
    <div className={`platformer-game ${theme}`} ref={gameContainerRef}>
      <div className="game-stats">
        <div className="stat-item">
          <span className="stat-label">Счет:</span>
          <span className="stat-value">{score}</span>
        </div>
        {isPaused && (
          <div className="pause-indicator">⏸️ Пауза</div>
        )}
      </div>

      <div 
        className="game-canvas"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
        onClick={!isStarted ? handleStart : handleJump}
      >
        {/* Земля */}
        <div 
          className="ground"
          style={{
            width: GAME_WIDTH,
            height: GROUND_HEIGHT,
            bottom: 0
          }}
        />

        {/* Игрок */}
        <div
          className="player"
          style={{
            left: player.x,
            bottom: GAME_HEIGHT - player.y - PLAYER_HEIGHT,
            width: PLAYER_WIDTH,
            height: PLAYER_HEIGHT
          }}
        >
          <CatIcon variant={2} size="2em" />
        </div>

        {/* Препятствия */}
        {obstacles.map(obstacle => {
          const obstacleBottom = GAME_HEIGHT - obstacle.y - obstacle.height
          return (
            <div
              key={obstacle.id}
              className="obstacle"
              style={{
                left: `${obstacle.x}px`,
                bottom: `${obstacleBottom}px`,
                width: `${obstacle.width}px`,
                height: `${obstacle.height}px`
              }}
            />
          )
        })}

        {/* Начальный экран */}
        {!isStarted && (
          <div className="start-screen">
            <h2>Платформер</h2>
            <p>Нажмите пробел или кликните, чтобы начать</p>
            <p className="controls-hint">Пробел / Стрелка вверх - прыжок</p>
            <p className="controls-hint">P - пауза</p>
          </div>
        )}

        {/* Экран окончания игры */}
        {gameOver && (
          <div className="game-over-screen">
            <h2>Игра окончена!</h2>
            <p>Ваш счет: {score}</p>
            <button onClick={handleRestart} className="restart-button">
              Играть снова
            </button>
          </div>
        )}
      </div>

      <div className="game-controls">
        <button 
          onClick={handleJump}
          className="jump-button"
          disabled={!isStarted || gameOver || isPaused}
        >
          Прыжок (Пробел)
        </button>
        {isStarted && !gameOver && (
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className="pause-button"
          >
            {isPaused ? '▶️ Продолжить' : '⏸️ Пауза'}
          </button>
        )}
      </div>
    </div>
  )
}

export default PlatformerGame


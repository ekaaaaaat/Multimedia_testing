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

  const spawnObstacle = useCallback(() => {
    setObstacles(prev => [
      ...prev,
      {
        id: Date.now(),
        x: GAME_WIDTH,
        y: GAME_HEIGHT - GROUND_HEIGHT - OBSTACLE_HEIGHT,
        width: OBSTACLE_WIDTH,
        height: OBSTACLE_HEIGHT
      }
    ])
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
    setPlayer(prev => {
      let newY = prev.y + prev.velocityY
      let newVelocityY = prev.velocityY + GRAVITY
      const groundY = GAME_HEIGHT - GROUND_HEIGHT - PLAYER_HEIGHT
      let isJumping = prev.isJumping

      // Проверка приземления
      if (newY >= groundY) {
        newY = groundY
        newVelocityY = 0
        isJumping = false
      }

      return {
        ...prev,
        y: newY,
        velocityY: newVelocityY,
        isJumping
      }
    })

    // Обновление препятствий
    setObstacles(prev => {
      return prev
        .map(obstacle => ({
          ...obstacle,
          x: obstacle.x - gameSpeedRef.current
        }))
        .filter(obstacle => obstacle.x + obstacle.width > 0)
    })

    // Увеличение скорости
    gameSpeedRef.current += SPEED_INCREMENT

    // Проверка столкновений
    setObstacles(prev => {
      const playerRect = {
        x: player.x,
        y: player.y,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT
      }

      const collision = prev.some(obstacle => {
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
        return prev
      }

      // Увеличение счета за успешно пройденные препятствия
      const passedObstacles = prev.filter(obstacle => obstacle.x + obstacle.width < player.x)
      if (passedObstacles.length > 0) {
        setScore(prevScore => prevScore + passedObstacles.length)
        return prev.filter(obstacle => obstacle.x + obstacle.width >= player.x)
      }

      return prev
    })
  }, [gameOver, isPaused, isStarted, player, checkCollision])

  useEffect(() => {
    if (isStarted && !gameOver && !isPaused) {
      gameLoopRef.current = requestAnimationFrame(function gameLoop() {
        updateGame()
        gameLoopRef.current = requestAnimationFrame(gameLoop)
      })

      obstacleSpawnTimerRef.current = setInterval(() => {
        spawnObstacle()
      }, 2000 - (gameSpeedRef.current * 50))
    } else {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
      if (obstacleSpawnTimerRef.current) {
        clearInterval(obstacleSpawnTimerRef.current)
      }
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
      if (obstacleSpawnTimerRef.current) {
        clearInterval(obstacleSpawnTimerRef.current)
      }
    }
  }, [isStarted, gameOver, isPaused, updateGame, spawnObstacle])

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
    setPlayer({
      x: 100,
      y: GAME_HEIGHT - GROUND_HEIGHT - PLAYER_HEIGHT,
      velocityY: 0,
      isJumping: false
    })
    setObstacles([])
    gameSpeedRef.current = INITIAL_SPEED
  }

  const handleRestart = () => {
    setIsStarted(false)
    setGameOver(false)
    setScore(0)
    setPlayer({
      x: 100,
      y: GAME_HEIGHT - GROUND_HEIGHT - PLAYER_HEIGHT,
      velocityY: 0,
      isJumping: false
    })
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
          <CatIcon variant={1} size="2em" />
        </div>

        {/* Препятствия */}
        {obstacles.map(obstacle => (
          <div
            key={obstacle.id}
            className="obstacle"
            style={{
              left: obstacle.x,
              bottom: GAME_HEIGHT - obstacle.y - obstacle.height,
              width: obstacle.width,
              height: obstacle.height
            }}
          />
        ))}

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


import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import SnakeGame from '../components/SnakeGame'
import CatIcon from '../components/CatIcon'
import './Games.css'

const Games = () => {
  const { theme } = useTheme()
  const [selectedGame, setSelectedGame] = useState(null)

  const games = [
    {
      id: 1,
      title: 'Змейка',
      description: 'Классическая игра-змейка для расслабления и отдыха. Управляйте котиком с помощью клавиш W, A, S, D.',
      status: 'Доступна',
      component: 'snake'
    },
    {
      id: 2,
      title: 'Найди баг',
      description: 'Расслабляющая игра для поиска ошибок. Отдохните и разомнитесь, ища дефекты в коде.',
      status: 'Скоро'
    },
    {
      id: 3,
      title: 'Тест-кейс мастер',
      description: 'Спокойная игра для создания тест-кейсов. Расслабьтесь, создавая сценарии тестирования.',
      status: 'Скоро'
    },
    {
      id: 4,
      title: 'Приоритизация дефектов',
      description: 'Медитативная игра для определения приоритетов. Отдохните, расставляя приоритеты дефектов.',
      status: 'Скоро'
    }
  ]

  return (
    <div className={`games-page ${theme}`}>
      <section className="games-header">
        <h1>Расслабляющие игры <CatIcon variant={0} size="1.5em" /></h1>
        <p className="games-intro">
          Отдохните и расслабьтесь после изучения материала. Расслабляющие игры помогут снять напряжение 
          и переключиться. После прохождения урока вы можете поиграть в короткую игру для отдыха и 
          восстановления энергии.
        </p>
      </section>

      {selectedGame && selectedGame.component === 'snake' ? (
        <div className="selected-game-container">
          <button 
            className="back-to-games-btn"
            onClick={() => setSelectedGame(null)}
          >
            ← Вернуться к играм
          </button>
          <div className="game-wrapper">
            <SnakeGame />
          </div>
        </div>
      ) : (
        <div className="games-grid">
          {games.map(game => (
            <div key={game.id} className="game-card">
              <div className="game-icon">
                {game.component === 'snake' ? <CatIcon variant={1} size="4rem" /> : '🎮'}
              </div>
              <h2>{game.title}</h2>
              <p className="game-description">{game.description}</p>
              <div className={`game-status ${game.status === 'Доступна' ? 'available' : ''}`}>
                {game.status}
              </div>
              {game.status === 'Доступна' ? (
                <button 
                  className="play-btn active"
                  onClick={() => setSelectedGame(game)}
                >
                  ▶️ Играть
                </button>
              ) : (
                <button className="play-btn" disabled>
                  Игра будет доступна скоро
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <section className="games-info">
        <h2>О расслабляющих играх</h2>
        <p>
          Расслабляющие игры в этом пособии созданы для отдыха и восстановления энергии после изучения 
          материала. Каждая игра помогает снять напряжение, переключиться и отдохнуть в приятной форме.
        </p>
        <p>
          Игры доступны после прохождения соответствующих уроков. Это позволяет отдохнуть и восстановить 
          силы перед следующим этапом обучения.
        </p>
      </section>
    </div>
  )
}

export default Games


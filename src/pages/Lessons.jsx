import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { useProgress } from '../contexts/ProgressContext'
import CatIcon from '../components/CatIcon'
import './Lessons.css'

const lessons = [
  {
    id: 1,
    title: 'Введение в тестирование программного обеспечения',
    description: 'Основные понятия, цели и задачи тестирования. История развития тестирования. Роль тестировщика в разработке ПО.',
    duration: '45 мин',
    level: 'Начальный',
    topics: ['Основные понятия', 'Цели тестирования', 'Принципы тестирования']
  },
  {
    id: 2,
    title: 'Дефекты и их жизненный цикл',
    description: 'Понятие дефекта, классификация дефектов, их серьезность и приоритет. Жизненный цикл дефекта, статусы и резолюции. Отчет о дефекте.',
    duration: '60 мин',
    level: 'Начальный',
    topics: ['Классификация дефектов', 'Серьезность и приоритет', 'Жизненный цикл дефекта']
  },
  {
    id: 3,
    title: 'Тестовая документация. Тест-кейсы.',
    description: 'Основные документы тестировщика: тест-кейсы, тест-сьюты, чек-листы, баг-репорты. Структура тест-кейса. Правила написания хороших тест-кейсов.',
    duration: '55 мин',
    level: 'Начальный',
    topics: ['Тест-кейсы', 'Структура тест-кейса', 'Правила написания тест-кейсов']
  },
  {
    id: 4,
    title: 'Тестовая документация. Чек-листы',
    description: 'Что такое чек-листы, их отличие от тест-кейсов. Примеры чек-листов. Преимущества и недостатки чек-листов.',
    duration: '50 мин',
    level: 'Начальный',
    topics: ['Чек-листы', 'Отличие от тест-кейсов', 'Преимущества и недостатки']
  },
  {
    id: 5,
    title: 'Тестовая документация. Баг-репорт',
    description: 'Что такое баг-репорт. Структура баг-репорта. Типичные ошибки в баг-репортах. Severity и Priority. Сравнение баг-репорта и тест-кейса.',
    duration: '65 мин',
    level: 'Средний',
    topics: ['Баг-репорт', 'Структура баг-репорта', 'Severity и Priority', 'Типичные ошибки']
  },
  {
    id: 6,
    title: 'Управление дефектами',
    description: 'Жизненный цикл дефекта. Отслеживание багов. Приоритизация и серьезность дефектов. Инструменты управления дефектами.',
    duration: '40 мин',
    level: 'Средний',
    topics: ['Жизненный цикл', 'Приоритизация', 'Инструменты']
  }
]

const Lessons = () => {
  const { theme } = useTheme()
  const { getLessonProgress, getTotalProgress } = useProgress()
  const totalProgress = getTotalProgress()

  return (
    <div className={`lessons-page ${theme}`}>
      <section className="lessons-header">
        <h1>Уроки по тестированию программного обеспечения <CatIcon variant={1} size="1.5em" /></h1>
        <p className="lessons-intro">
          Изучайте тестирование программного обеспечения через интерактивные уроки. 
          Каждый урок содержит теоретический материал, примеры, мультимедийные материалы, 
          интерактивные тесты и практические задания.
        </p>
        {totalProgress > 0 && (
          <div className="overall-progress">
            <p>Общий прогресс: <strong>{totalProgress}%</strong> 🎯</p>
            <div className="overall-progress-bar">
              <div 
                className="overall-progress-fill"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
          </div>
        )}
      </section>

      <div className="lessons-grid">
        {lessons.map(lesson => {
          const progress = getLessonProgress(lesson.id)
          const lessonProgress = [
            progress.contentViewed,
            progress.testCompleted,
            progress.gamePlayed,
            progress.musicListened
          ].filter(Boolean).length
          const lessonPercentage = Math.round((lessonProgress / 4) * 100)

          return (
            <div key={lesson.id} className="lesson-card">
              <div className="lesson-header">
                <span className="lesson-level">{lesson.level}</span>
                <span className="lesson-duration">⏱ {lesson.duration}</span>
              </div>
              {progress.completed && (
                <div className="lesson-completed-badge">✅ Завершен</div>
              )}
              <h2>{lesson.title}</h2>
              <p className="lesson-description">{lesson.description}</p>
              {lessonProgress > 0 && (
                <div className="lesson-progress-mini">
                  <span>Прогресс: {lessonPercentage}%</span>
                  <div className="mini-progress-bar">
                    <div 
                      className="mini-progress-fill"
                      style={{ width: `${lessonPercentage}%` }}
                    />
                  </div>
                </div>
              )}
              <div className="lesson-topics">
                <strong>Темы урока:</strong>
                <ul>
                  {lesson.topics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              </div>
              <Link to={`/lessons/${lesson.id}`} className="lesson-button">
                {progress.completed ? <>Повторить урок <CatIcon variant={2} size="1em" /></> : <>Начать урок <CatIcon variant={0} size="1em" /></>}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Lessons


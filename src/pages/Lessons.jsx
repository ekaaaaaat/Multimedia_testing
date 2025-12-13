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
    title: 'Виды и уровни тестирования',
    description: 'Классификация тестирования по различным признакам. Уровни тестирования: модульное, интеграционное, системное, приемочное.',
    duration: '60 мин',
    level: 'Начальный',
    topics: ['Уровни тестирования', 'Виды по целям', 'Статическое и динамическое']
  },
  {
    id: 3,
    title: 'Техники тестирования: черный ящик',
    description: 'Тестирование методом черного ящика. Эквивалентное разбиение, граничные значения, таблицы решений.',
    duration: '50 мин',
    level: 'Средний',
    topics: ['Эквивалентное разбиение', 'Граничные значения', 'Таблицы решений']
  },
  {
    id: 4,
    title: 'Техники тестирования: белый ящик',
    description: 'Тестирование методом белого ящика. Покрытие кода, покрытие веток, покрытие условий.',
    duration: '55 мин',
    level: 'Средний',
    topics: ['Покрытие кода', 'Покрытие веток', 'Покрытие условий']
  },
  {
    id: 5,
    title: 'Тест-дизайн и создание тест-кейсов',
    description: 'Методы проектирования тестов. Структура тест-кейса. Приоритизация тестов. Тестовые сценарии.',
    duration: '65 мин',
    level: 'Средний',
    topics: ['Структура тест-кейса', 'Приоритизация', 'Тестовые сценарии']
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


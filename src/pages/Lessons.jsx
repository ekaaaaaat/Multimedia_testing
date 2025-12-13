import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
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

  return (
    <div className={`lessons-page ${theme}`}>
      <section className="lessons-header">
        <h1>Уроки по тестированию программного обеспечения</h1>
        <p className="lessons-intro">
          Изучайте тестирование программного обеспечения через интерактивные уроки. 
          Каждый урок содержит теоретический материал, примеры, мультимедийные материалы, 
          интерактивные тесты и практические задания.
        </p>
      </section>

      <div className="lessons-grid">
        {lessons.map(lesson => (
          <div key={lesson.id} className="lesson-card">
            <div className="lesson-header">
              <span className="lesson-level">{lesson.level}</span>
              <span className="lesson-duration">⏱ {lesson.duration}</span>
            </div>
            <h2>{lesson.title}</h2>
            <p className="lesson-description">{lesson.description}</p>
            <div className="lesson-topics">
              <strong>Темы урока:</strong>
              <ul>
                {lesson.topics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>
            <Link to={`/lessons/${lesson.id}`} className="lesson-button">
              Начать урок →
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Lessons


import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import InteractiveTest from '../components/InteractiveTest'
import MediaPlayer from '../components/MediaPlayer'
import './LessonDetail.css'

const LessonDetail = () => {
  const { id } = useParams()
  const { theme } = useTheme()
  const [currentSection, setCurrentSection] = useState('content')

  // Здесь будет загружаться контент урока по ID
  // Пока используем заглушку
  const lessonContent = {
    title: 'Введение в тестирование программного обеспечения',
    sections: [
      {
        type: 'text',
        title: 'Что такое тестирование?',
        content: 'Тестирование программного обеспечения — это процесс проверки соответствия программного продукта установленным требованиям и выявления дефектов. Тестирование помогает убедиться, что программное обеспечение работает корректно и соответствует ожиданиям пользователей.'
      },
      {
        type: 'text',
        title: 'Цели тестирования',
        content: 'Основными целями тестирования являются: обнаружение дефектов, проверка соответствия требованиям, оценка качества продукта, снижение рисков и повышение уверенности в качестве программного обеспечения.'
      },
      {
        type: 'media',
        title: 'Видео: Основы тестирования',
        mediaType: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      },
      {
        type: 'test',
        title: 'Проверка знаний',
        testId: 'test-1'
      }
    ]
  }

  const testQuestions = [
    {
      id: 1,
      question: 'Что является основной целью тестирования?',
      options: [
        'Написание кода',
        'Обнаружение дефектов',
        'Проектирование архитектуры',
        'Документирование'
      ],
      correct: 1
    },
    {
      id: 2,
      question: 'Какие виды тестирования вы знаете?',
      options: [
        'Только ручное тестирование',
        'Ручное и автоматизированное',
        'Только автоматизированное',
        'Тестирование не нужно'
      ],
      correct: 1
    }
  ]

  return (
    <div className={`lesson-detail-page ${theme}`}>
      <div className="lesson-nav">
        <Link to="/lessons" className="back-link">← Вернуться к урокам</Link>
        <div className="section-tabs">
          <button 
            className={currentSection === 'content' ? 'active' : ''}
            onClick={() => setCurrentSection('content')}
          >
            Контент
          </button>
          <button 
            className={currentSection === 'test' ? 'active' : ''}
            onClick={() => setCurrentSection('test')}
          >
            Тест
          </button>
          <button 
            className={currentSection === 'game' ? 'active' : ''}
            onClick={() => setCurrentSection('game')}
          >
            Игра
          </button>
          <button 
            className={currentSection === 'music' ? 'active' : ''}
            onClick={() => setCurrentSection('music')}
          >
            Музыка
          </button>
        </div>
      </div>

      <div className="lesson-content-wrapper">
        {currentSection === 'content' && (
          <div className="lesson-content">
            <h1>{lessonContent.title}</h1>
            {lessonContent.sections.map((section, index) => (
              <div key={index} className="content-section">
                {section.type === 'text' && (
                  <div className="text-section">
                    <h2>{section.title}</h2>
                    <p>{section.content}</p>
                  </div>
                )}
                {section.type === 'media' && (
                  <div className="media-section">
                    <h2>{section.title}</h2>
                    <MediaPlayer type={section.mediaType} src={section.src} />
                  </div>
                )}
                {section.type === 'test' && (
                  <div className="inline-test-section">
                    <h2>{section.title}</h2>
                    <InteractiveTest questions={testQuestions.slice(0, 2)} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {currentSection === 'test' && (
          <div className="lesson-test">
            <h1>Итоговый тест по уроку</h1>
            <InteractiveTest questions={testQuestions} />
          </div>
        )}

        {currentSection === 'game' && (
          <div className="lesson-game">
            <h1>Обучающая игра</h1>
            <p>Игра будет добавлена позже</p>
            {/* Здесь будет компонент игры */}
          </div>
        )}

        {currentSection === 'music' && (
          <div className="lesson-music">
            <h1>Расслабляющая музыка</h1>
            <MediaPlayer type="audio" src="" />
            <p>Музыкальные треки будут добавлены позже</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LessonDetail


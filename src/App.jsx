import { useState } from 'react'
import './App.css'

function App() {
  const [currentSection, setCurrentSection] = useState('home')

  return (
    <div className="app">
      <header className="app-header">
        <h1>Мультимедийное пособие</h1>
        <nav className="nav-menu">
          <button 
            className={currentSection === 'home' ? 'active' : ''}
            onClick={() => setCurrentSection('home')}
          >
            Главная
          </button>
          <button 
            className={currentSection === 'lessons' ? 'active' : ''}
            onClick={() => setCurrentSection('lessons')}
          >
            Уроки
          </button>
          <button 
            className={currentSection === 'media' ? 'active' : ''}
            onClick={() => setCurrentSection('media')}
          >
            Медиа
          </button>
          <button 
            className={currentSection === 'about' ? 'active' : ''}
            onClick={() => setCurrentSection('about')}
          >
            О проекте
          </button>
        </nav>
      </header>

      <main className="app-main">
        {currentSection === 'home' && (
          <section className="home-section">
            <h2>Добро пожаловать!</h2>
            <p>Это мультимедийное пособие для изучения различных материалов.</p>
            <div className="features">
              <div className="feature-card">
                <h3>📚 Уроки</h3>
                <p>Интерактивные уроки с различными материалами</p>
              </div>
              <div className="feature-card">
                <h3>🎥 Видео</h3>
                <p>Видеоматериалы для лучшего понимания</p>
              </div>
              <div className="feature-card">
                <h3>🎵 Аудио</h3>
                <p>Аудиоматериалы для прослушивания</p>
              </div>
              <div className="feature-card">
                <h3>📊 Интерактив</h3>
                <p>Интерактивные элементы для практики</p>
              </div>
            </div>
          </section>
        )}

        {currentSection === 'lessons' && (
          <section className="lessons-section">
            <h2>Уроки</h2>
            <div className="lessons-grid">
              <div className="lesson-card">
                <h3>Урок 1</h3>
                <p>Введение в тему</p>
                <button>Начать урок</button>
              </div>
              <div className="lesson-card">
                <h3>Урок 2</h3>
                <p>Основные понятия</p>
                <button>Начать урок</button>
              </div>
              <div className="lesson-card">
                <h3>Урок 3</h3>
                <p>Практические задания</p>
                <button>Начать урок</button>
              </div>
            </div>
          </section>
        )}

        {currentSection === 'media' && (
          <section className="media-section">
            <h2>Медиа материалы</h2>
            <div className="media-tabs">
              <button className="tab-button active">Видео</button>
              <button className="tab-button">Аудио</button>
              <button className="tab-button">Изображения</button>
            </div>
            <div className="media-content">
              <p>Здесь будут отображаться медиа материалы</p>
            </div>
          </section>
        )}

        {currentSection === 'about' && (
          <section className="about-section">
            <h2>О проекте</h2>
            <p>Это мультимедийное пособие создано с использованием React и Vite.</p>
            <p>Проект предназначен для интерактивного обучения с использованием различных типов медиа контента.</p>
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 Мультимедийное пособие. Все права защищены.</p>
      </footer>
    </div>
  )
}

export default App



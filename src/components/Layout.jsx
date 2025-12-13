import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { useAnimation } from '../contexts/AnimationContext'
import GlobalMusicPlayer from './GlobalMusicPlayer'
import CatIcon from './CatIcon'
import './Layout.css'

const Layout = ({ children }) => {
  const { theme, toggleTheme } = useTheme()
  const { animationsEnabled, toggleAnimations } = useAnimation()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <div className={`app ${theme}`}>
      <header className="app-header">
        <div className="header-container">
          <Link to="/" className="logo">
            <h1>
              Тестирование программного обеспечения{' '}
              <CatIcon variant={0} size="1.2em" />
            </h1>
            <span className="subtitle">Мультимедийное пособие</span>
          </Link>
          <div className="header-controls">
            <button 
              className="animation-toggle" 
              onClick={toggleAnimations}
              title={animationsEnabled ? 'Выключить анимацию котиков' : 'Включить анимацию котиков'}
            >
              {animationsEnabled ? (
                <CatIcon variant={2} size="1.5rem" />
              ) : (
                <CatIcon variant={3} size="1.5rem" />
              )}
            </button>
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
        <nav className="nav-menu">
          <Link 
            to="/" 
            className={isActive('/') ? 'active' : ''}
          >
            🏠 Главная
          </Link>
          <Link 
            to="/lessons" 
            className={isActive('/lessons') || location.pathname.startsWith('/lessons/') ? 'active' : ''}
          >
            📚 Уроки
          </Link>
          <Link 
            to="/tests" 
            className={isActive('/tests') ? 'active' : ''}
          >
            📝 Тесты
          </Link>
          <Link 
            to="/games" 
            className={isActive('/games') ? 'active' : ''}
          >
            🎮 Игры
          </Link>
          <Link 
            to="/media" 
            className={isActive('/media') ? 'active' : ''}
          >
            🎥 Медиа
          </Link>
          <Link 
            to="/about" 
            className={isActive('/about') ? 'active' : ''}
          >
            ℹ️ О проекте
          </Link>
        </nav>
      </header>

      <main className="app-main">
        {children}
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 Мультимедийное пособие по тестированию программного обеспечения. Все права защищены. <CatIcon variant={1} size="1em" /></p>
      </footer>
      
      <GlobalMusicPlayer />
    </div>
  )
}

export default Layout


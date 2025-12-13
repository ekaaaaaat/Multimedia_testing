import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import './Layout.css'

const Layout = ({ children }) => {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <div className={`app ${theme}`}>
      <header className="app-header">
        <div className="header-container">
          <Link to="/" className="logo">
            <h1>Тестирование программного обеспечения</h1>
            <span className="subtitle">Мультимедийное пособие</span>
          </Link>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
        <nav className="nav-menu">
          <Link 
            to="/" 
            className={isActive('/') ? 'active' : ''}
          >
            Главная
          </Link>
          <Link 
            to="/lessons" 
            className={isActive('/lessons') || location.pathname.startsWith('/lessons/') ? 'active' : ''}
          >
            Уроки
          </Link>
          <Link 
            to="/tests" 
            className={isActive('/tests') ? 'active' : ''}
          >
            Тесты
          </Link>
          <Link 
            to="/games" 
            className={isActive('/games') ? 'active' : ''}
          >
            Игры
          </Link>
          <Link 
            to="/media" 
            className={isActive('/media') ? 'active' : ''}
          >
            Медиа
          </Link>
          <Link 
            to="/about" 
            className={isActive('/about') ? 'active' : ''}
          >
            О проекте
          </Link>
        </nav>
      </header>

      <main className="app-main">
        {children}
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 Мультимедийное пособие по тестированию программного обеспечения. Все права защищены.</p>
      </footer>
    </div>
  )
}

export default Layout


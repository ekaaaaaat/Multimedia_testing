import { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import './LessonNavigation.css'

const LessonNavigation = ({ sections, onSectionClick }) => {
  const { theme } = useTheme()
  const [activeSection, setActiveSection] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(`section-${i}`)
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(i)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Проверяем при загрузке

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const scrollToSection = (index) => {
    const element = document.getElementById(`section-${index}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(index)
      if (onSectionClick) {
        onSectionClick(index)
      }
    }
  }

  return (
    <nav className={`lesson-navigation ${theme}`}>
      <h3>📑 Навигация по уроку</h3>
      <ul className="nav-sections">
        {sections.map((section, index) => (
          <li key={index}>
            <button
              className={`nav-item ${activeSection === index ? 'active' : ''}`}
              onClick={() => scrollToSection(index)}
            >
              {section.icon && <span className="nav-icon">{section.icon}</span>}
              <span className="nav-text">{section.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default LessonNavigation






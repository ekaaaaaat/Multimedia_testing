import { useTheme } from '../contexts/ThemeContext'
import './ContentMarker.css'

const ContentMarker = ({ type, children }) => {
  const { theme } = useTheme()
  
  const markers = {
    'definition': { icon: '📚', label: 'Определение', className: 'definition-marker' },
    'tip': { icon: '💡', label: 'Совет', className: 'tip-marker' },
    'example': { icon: '🔍', label: 'Пример', className: 'example-marker' },
    'conclusion': { icon: '📊', label: 'Выводы', className: 'conclusion-marker' },
    'question': { icon: '❓', label: 'Контрольные вопросы', className: 'question-marker' }
  }

  const marker = markers[type] || markers['definition']

  return (
    <div className={`content-marker ${marker.className} ${theme}`}>
      <div className="marker-header">
        <span className="marker-icon">{marker.icon}</span>
        <span className="marker-label">{marker.label}</span>
      </div>
      <div className="marker-content">
        {children}
      </div>
    </div>
  )
}

export default ContentMarker






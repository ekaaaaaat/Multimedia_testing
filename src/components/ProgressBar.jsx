import { useProgress } from '../contexts/ProgressContext'
import CatIcon from './CatIcon'
import './ProgressBar.css'

const ProgressBar = ({ lessonId }) => {
  const { getLessonProgress } = useProgress()
  const progress = getLessonProgress(lessonId)

  const sections = [
    { key: 'contentViewed', label: 'Контент', emoji: '📖' },
    { key: 'testCompleted', label: 'Тест', emoji: '📝' },
    { key: 'gamePlayed', label: 'Игра', emoji: '🎮' },
    { key: 'musicListened', label: 'Музыка', emoji: '🎵' }
  ]

  const completedSections = sections.filter(s => progress[s.key]).length
  const totalSections = sections.length
  const percentage = totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0

  return (
    <div className="progress-bar-container">
      <div className="progress-header">
        <span className="progress-title"><CatIcon variant={2} size="1.2em" /> Прогресс урока</span>
        <span className="progress-percentage">{percentage}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="progress-sections">
        {sections.map(section => (
          <div 
            key={section.key} 
            className={`progress-section ${progress[section.key] ? 'completed' : ''}`}
          >
            <span className="section-emoji">{section.emoji}</span>
            <span className="section-label">{section.label}</span>
            {progress[section.key] && <span className="checkmark">✓</span>}
          </div>
        ))}
      </div>
      {progress.completed && (
        <div className="completion-badge">
          🎉 Урок завершен! <CatIcon variant={3} size="1.2em" />
        </div>
      )}
    </div>
  )
}

export default ProgressBar


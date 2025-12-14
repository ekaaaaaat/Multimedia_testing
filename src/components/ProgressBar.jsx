import { useState } from 'react'
import { useProgress } from '../contexts/ProgressContext'
import CatIcon from './CatIcon'
import './ProgressBar.css'

const ProgressBar = ({ lessonId }) => {
  const { getLessonProgress, resetLessonProgress } = useProgress()
  const progress = getLessonProgress(lessonId)
  const [showConfirm, setShowConfirm] = useState(false)

  const sections = [
    { key: 'contentViewed', label: 'Контент', emoji: '📖' },
    { key: 'testCompleted', label: 'Тест', emoji: '📝' },
    ...(lessonId === '2' ? [{ key: 'labCompleted', label: 'Лабораторная работа', emoji: '🔬' }] : []),
    { key: 'gamePlayed', label: 'Игра', emoji: '🎮' },
    { key: 'musicListened', label: 'Музыка', emoji: '🎵' }
  ]

  const completedSections = sections.filter(s => progress[s.key]).length
  const totalSections = sections.length
  const percentage = totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0

  const hasProgress = completedSections > 0 || progress.completed

  const handleReset = () => {
    if (showConfirm) {
      resetLessonProgress(lessonId)
      setShowConfirm(false)
    } else {
      setShowConfirm(true)
      setTimeout(() => setShowConfirm(false), 3000)
    }
  }

  return (
    <div className="progress-bar-container">
      <div className="progress-header">
        <span className="progress-title"><CatIcon variant={2} size="1.2em" /> Прогресс урока</span>
        <div className="progress-header-right">
          <span className="progress-percentage">{percentage}%</span>
          {hasProgress && (
            <button 
              className={`reset-progress-btn ${showConfirm ? 'confirm' : ''}`}
              onClick={handleReset}
              title={showConfirm ? 'Подтвердить сброс' : 'Сбросить прогресс урока'}
            >
              {showConfirm ? '✓' : '↻'}
            </button>
          )}
        </div>
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


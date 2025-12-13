import { createContext, useContext, useState, useEffect } from 'react'

const ProgressContext = createContext()

export const useProgress = () => {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider')
  }
  return context
}

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('lessonProgress')
    return saved ? JSON.parse(saved) : {}
  })

  const [likedMedia, setLikedMedia] = useState(() => {
    const saved = localStorage.getItem('likedMedia')
    return saved ? JSON.parse(saved) : {}
  })

  useEffect(() => {
    localStorage.setItem('lessonProgress', JSON.stringify(progress))
  }, [progress])

  useEffect(() => {
    localStorage.setItem('likedMedia', JSON.stringify(likedMedia))
  }, [likedMedia])

  const markLessonComplete = (lessonId) => {
    setProgress(prev => ({
      ...prev,
      [lessonId]: {
        ...prev[lessonId],
        completed: true,
        completedAt: new Date().toISOString()
      }
    }))
  }

  const updateLessonProgress = (lessonId, section, value) => {
    setProgress(prev => ({
      ...prev,
      [lessonId]: {
        ...prev[lessonId],
        [section]: value,
        lastAccessed: new Date().toISOString()
      }
    }))
  }

  const getLessonProgress = (lessonId) => {
    return progress[lessonId] || {
      completed: false,
      contentViewed: false,
      testCompleted: false,
      gamePlayed: false,
      musicListened: false
    }
  }

  const toggleLike = (mediaId, mediaType) => {
    const key = `${mediaType}-${mediaId}`
    setLikedMedia(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const isLiked = (mediaId, mediaType) => {
    const key = `${mediaType}-${mediaId}`
    return likedMedia[key] || false
  }

  const getTotalProgress = () => {
    const totalLessons = 6 // Количество уроков
    const completedLessons = Object.values(progress).filter(p => p.completed).length
    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
  }

  return (
    <ProgressContext.Provider value={{
      progress,
      markLessonComplete,
      updateLessonProgress,
      getLessonProgress,
      toggleLike,
      isLiked,
      getTotalProgress
    }}>
      {children}
    </ProgressContext.Provider>
  )
}


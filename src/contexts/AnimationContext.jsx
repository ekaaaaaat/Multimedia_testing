import { createContext, useContext, useState, useEffect } from 'react'

const AnimationContext = createContext()

export const useAnimation = () => {
  const context = useContext(AnimationContext)
  if (!context) {
    throw new Error('useAnimation must be used within AnimationProvider')
  }
  return context
}

export const AnimationProvider = ({ children }) => {
  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    const saved = localStorage.getItem('catAnimationsEnabled')
    return saved !== null ? saved === 'true' : true // По умолчанию включено
  })

  useEffect(() => {
    localStorage.setItem('catAnimationsEnabled', animationsEnabled.toString())
  }, [animationsEnabled])

  const toggleAnimations = () => {
    setAnimationsEnabled(prev => !prev)
  }

  return (
    <AnimationContext.Provider value={{ animationsEnabled, toggleAnimations }}>
      {children}
    </AnimationContext.Provider>
  )
}


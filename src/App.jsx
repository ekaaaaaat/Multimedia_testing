import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { ProgressProvider } from './contexts/ProgressContext'
import { AnimationProvider } from './contexts/AnimationContext'
import Layout from './components/Layout'
import CatAnimation from './components/CatAnimation'
import Intro from './components/Intro'
import Home from './pages/Home'
import Lessons from './pages/Lessons'
import LessonDetail from './pages/LessonDetail'
import Tests from './pages/Tests'
import Games from './pages/Games'
import Media from './pages/Media'
import About from './pages/About'
import './App.css'

function App() {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    // Проверяем, был ли интро уже показан в этой сессии
    const introShown = sessionStorage.getItem('introShown')
    if (introShown) {
      setShowIntro(false)
    }
  }, [])

  const handleIntroComplete = () => {
    setShowIntro(false)
    sessionStorage.setItem('introShown', 'true')
  }

  return (
    <ThemeProvider>
      <ProgressProvider>
        <AnimationProvider>
          <Router>
            {showIntro && <Intro onComplete={handleIntroComplete} />}
            <CatAnimation />
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/lessons" element={<Lessons />} />
                <Route path="/lessons/:id" element={<LessonDetail />} />
                <Route path="/tests" element={<Tests />} />
                <Route path="/games" element={<Games />} />
                <Route path="/media" element={<Media />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </Layout>
          </Router>
        </AnimationProvider>
      </ProgressProvider>
    </ThemeProvider>
  )
}

export default App

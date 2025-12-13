import { createContext, useContext, useState, useRef, useEffect } from 'react'

const MusicContext = createContext()

export const useMusic = () => {
  const context = useContext(MusicContext)
  if (!context) {
    throw new Error('useMusic must be used within MusicProvider')
  }
  return context
}

export const MusicProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('musicVolume')
    return saved !== null ? parseFloat(saved) : 0.7
  })
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.error('Error playing audio:', err)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
    localStorage.setItem('musicVolume', volume.toString())
  }, [volume])

  const playMusic = (src, title) => {
    if (currentTrack && currentTrack.src === src) {
      // Если это та же музыка, просто переключаем воспроизведение
      setIsPlaying(!isPlaying)
    } else {
      // Новая музыка
      setCurrentTrack({ src, title })
      setIsPlaying(true)
      setIsVisible(true)
    }
  }

  const pauseMusic = () => {
    setIsPlaying(false)
  }

  const resumeMusic = () => {
    setIsPlaying(true)
  }

  const stopMusic = () => {
    setIsPlaying(false)
    setCurrentTrack(null)
    setIsVisible(false)
  }

  const togglePlayPause = () => {
    if (currentTrack) {
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume)
  }

  return (
    <MusicContext.Provider value={{
      currentTrack,
      isPlaying,
      isVisible,
      volume,
      playMusic,
      pauseMusic,
      resumeMusic,
      stopMusic,
      togglePlayPause,
      setVolume: handleVolumeChange
    }}>
      {children}
      {currentTrack && (
        <audio
          ref={audioRef}
          src={currentTrack.src}
          loop
          onEnded={() => setIsPlaying(false)}
        />
      )}
    </MusicContext.Provider>
  )
}


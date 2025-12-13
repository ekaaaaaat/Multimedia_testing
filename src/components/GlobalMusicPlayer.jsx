import { useMusic } from '../contexts/MusicContext'
import { useTheme } from '../contexts/ThemeContext'
import CatIcon from './CatIcon'
import './GlobalMusicPlayer.css'

const GlobalMusicPlayer = () => {
  const { currentTrack, isPlaying, isVisible, togglePlayPause, stopMusic } = useMusic()
  const { theme } = useTheme()

  if (!isVisible || !currentTrack) {
    return null
  }

  return (
    <div className={`global-music-player ${theme}`}>
      <div className="music-player-content">
        <div className="music-info">
          <CatIcon variant={4} size="1.5em" />
          <div className="music-details">
            <span className="music-title">{currentTrack.title}</span>
            <span className="music-status">{isPlaying ? '▶️ Воспроизведение' : '⏸️ На паузе'}</span>
          </div>
        </div>
        <div className="music-controls">
          <button 
            className="music-control-btn"
            onClick={togglePlayPause}
            title={isPlaying ? 'Пауза' : 'Воспроизведение'}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button 
            className="music-control-btn close-btn"
            onClick={stopMusic}
            title="Закрыть"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}

export default GlobalMusicPlayer


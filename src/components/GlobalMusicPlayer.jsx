import { useMusic } from '../contexts/MusicContext'
import { useTheme } from '../contexts/ThemeContext'
import CatIcon from './CatIcon'
import './GlobalMusicPlayer.css'

const GlobalMusicPlayer = () => {
  const { currentTrack, isPlaying, isVisible, volume, togglePlayPause, stopMusic, setVolume } = useMusic()
  const { theme } = useTheme()

  if (!isVisible || !currentTrack) {
    return null
  }

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value))
  }

  const getVolumeIcon = () => {
    if (volume === 0) return '🔇'
    if (volume < 0.3) return '🔉'
    return '🔊'
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
          <div className="volume-control">
            <span className="volume-icon" title="Громкость">{getVolumeIcon()}</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
              title={`Громкость: ${Math.round(volume * 100)}%`}
            />
          </div>
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


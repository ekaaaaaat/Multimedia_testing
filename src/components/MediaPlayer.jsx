import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import './MediaPlayer.css'

const MediaPlayer = ({ type, src, title }) => {
  const { theme } = useTheme()
  const [playing, setPlaying] = useState(false)

  if (type === 'video') {
    return (
      <div className={`media-player ${theme}`}>
        {title && <h3>{title}</h3>}
        <div className="video-wrapper">
          <video 
            controls 
            className="media-video"
            src={src}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          >
            Ваш браузер не поддерживает видео.
          </video>
        </div>
      </div>
    )
  }

  if (type === 'audio') {
    return (
      <div className={`media-player ${theme}`}>
        {title && <h3>{title}</h3>}
        <div className="audio-wrapper">
          <audio 
            controls 
            className="media-audio"
            src={src}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          >
            Ваш браузер не поддерживает аудио.
          </audio>
        </div>
      </div>
    )
  }

  if (type === 'image') {
    return (
      <div className={`media-player ${theme}`}>
        {title && <h3>{title}</h3>}
        <div className="image-wrapper">
          <img src={src} alt={title || 'Изображение'} className="media-image" />
        </div>
      </div>
    )
  }

  return (
    <div className={`media-player ${theme}`}>
      <p>Тип медиа не определен</p>
    </div>
  )
}

export default MediaPlayer


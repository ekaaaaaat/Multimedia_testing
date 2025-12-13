import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import LikeButton from './LikeButton'
import './MediaPlayer.css'

const MediaPlayer = ({ type, src, title, mediaId }) => {
  const { theme } = useTheme()
  const [playing, setPlaying] = useState(false)

  if (type === 'video') {
    return (
      <div className={`media-player ${theme}`}>
        <div className="media-header">
          {title && <h3>{title} <CatIcon variant={0} size="1.2em" /></h3>}
          {mediaId && <LikeButton mediaId={mediaId} mediaType="video" />}
        </div>
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
        <div className="media-header">
          {title && <h3>{title} <CatIcon variant={0} size="1.2em" /></h3>}
          {mediaId && <LikeButton mediaId={mediaId} mediaType="audio" />}
        </div>
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
        <div className="media-header">
          {title && <h3>{title} <CatIcon variant={0} size="1.2em" /></h3>}
          {mediaId && <LikeButton mediaId={mediaId} mediaType="image" />}
        </div>
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


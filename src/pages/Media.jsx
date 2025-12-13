import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import MediaPlayer from '../components/MediaPlayer'
import './Media.css'

const Media = () => {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState('video')

  const videos = [
    {
      id: 1,
      title: 'Введение в тестирование ПО',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      description: 'Обзорная лекция об основах тестирования программного обеспечения'
    },
    {
      id: 2,
      title: 'Виды тестирования',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      description: 'Подробный разбор различных видов и уровней тестирования'
    }
  ]

  const audioFiles = [
    {
      id: 1,
      title: 'Лекция: Основы тестирования',
      src: '',
      description: 'Аудиолекция по основам тестирования программного обеспечения'
    },
    {
      id: 2,
      title: 'Подкаст: Тест-дизайн',
      src: '',
      description: 'Обсуждение методов проектирования тестов'
    }
  ]

  const images = [
    {
      id: 1,
      title: 'Схема уровней тестирования',
      src: 'https://via.placeholder.com/800x400/00897b/ffffff?text=Схема+уровней+тестирования',
      description: 'Визуальная схема различных уровней тестирования'
    },
    {
      id: 2,
      title: 'Жизненный цикл дефекта',
      src: 'https://via.placeholder.com/800x400/00acc1/ffffff?text=Жизненный+цикл+дефекта',
      description: 'Диаграмма жизненного цикла дефекта в процессе тестирования'
    }
  ]

  return (
    <div className={`media-page ${theme}`}>
      <section className="media-header">
        <h1>Медиа материалы 🐱</h1>
        <p className="media-intro">
          Коллекция мультимедийных материалов по тестированию программного обеспечения. 
          Здесь вы найдете видео, аудио, изображения и анимации для лучшего понимания материала. 
          Ставьте лайки понравившимся материалам! ❤️
        </p>
      </section>

      <div className="media-tabs">
        <button 
          className={activeTab === 'video' ? 'active' : ''}
          onClick={() => setActiveTab('video')}
        >
          🎥 Видео
        </button>
        <button 
          className={activeTab === 'audio' ? 'active' : ''}
          onClick={() => setActiveTab('audio')}
        >
          🎵 Аудио
        </button>
        <button 
          className={activeTab === 'image' ? 'active' : ''}
          onClick={() => setActiveTab('image')}
        >
          🖼️ Изображения
        </button>
      </div>

      <div className="media-content">
        {activeTab === 'video' && (
          <div className="media-section">
            <h2>Видеоматериалы</h2>
            <div className="media-grid">
              {videos.map(video => (
                <div key={video.id} className="media-item">
                  <MediaPlayer 
                    type="video" 
                    src={video.src} 
                    title={video.title}
                    mediaId={`video-${video.id}`}
                  />
                  <p className="media-description">{video.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'audio' && (
          <div className="media-section">
            <h2>Аудиоматериалы</h2>
            <div className="media-grid">
              {audioFiles.map(audio => (
                <div key={audio.id} className="media-item">
                  <MediaPlayer 
                    type="audio" 
                    src={audio.src} 
                    title={audio.title}
                    mediaId={`audio-${audio.id}`}
                  />
                  <p className="media-description">{audio.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'image' && (
          <div className="media-section">
            <h2>Изображения и схемы</h2>
            <div className="media-grid">
              {images.map(image => (
                <div key={image.id} className="media-item">
                  <MediaPlayer 
                    type="image" 
                    src={image.src} 
                    title={image.title}
                    mediaId={`image-${image.id}`}
                  />
                  <p className="media-description">{image.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Media


import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { useMusic } from '../contexts/MusicContext'
import MediaPlayer from '../components/MediaPlayer'
import CatIcon from '../components/CatIcon'
import './Media.css'

// Import media from Lesson 1
import videoLesson1 from '../assets/videos/Lesson1.mp4'
import videoLesson2 from '../assets/videos/Lesson2.mp4'
import videoLesson3 from '../assets/videos/Lesson3.mp4'
import videoLesson4 from '../assets/videos/Lesson4.mp4'
import musicLesson1 from '../assets/music/relaxing_music_lesson1.mp3'
import musicLesson2 from '../assets/music/Daydreams-chosic.com_.mp3'
import musicLesson3 from '../assets/music/Cozy-Place-Chill-Background-Music(chosic.com).mp3'
import musicLesson4 from '../assets/music/Late-at-Night(chosic.com).mp3'
import imageMarkII from '../assets/images/Mark_II.png'
import imageFirstBug from '../assets/images/First_Computer_Bug,_1947.jpg'
import imageModelHierarchy from '../assets/images/model_ierarhi.png'
import imageDiagram from '../assets/images/diagram.png'
// Import media from Lesson 2
import imageGagarin from '../assets/images/gagarin.png'
import imageDefectLifeCycle from '../assets/images/defect_life_cycle.jpg'
import animation404Cat from '../assets/animation/404Cat.gif'
import imageTestCheck from '../assets/images/tset_check.png'

const Media = () => {
  const { theme } = useTheme()
  const { playMusic, currentTrack, isPlaying } = useMusic()
  const [activeTab, setActiveTab] = useState('video')

  const videos = [
    {
      id: 1,
      title: 'Введение в тестирование программного обеспечения',
      src: videoLesson1,
      description: 'Видеоурок по основам тестирования программного обеспечения из первого урока'
    },
    {
      id: 2,
      title: 'Дефекты и их жизненный цикл',
      src: videoLesson2,
      description: 'Видеоурок по дефектам и их жизненному циклу из второго урока'
    },
    {
      id: 3,
      title: 'Тестовая документация. Тест-кейсы.',
      src: videoLesson3,
      description: 'Видеоурок по тестовой документации и тест-кейсам из третьего урока'
    },
    {
      id: 4,
      title: 'Тестовая документация. Чек-листы',
      src: videoLesson4,
      description: 'Видеоурок по тестовой документации и чек-листам из четвертого урока'
    }
  ]

  const audioFiles = [
    {
      id: 1,
      title: 'Расслабляющая музыка для изучения материала',
      src: musicLesson1,
      description: 'Расслабляющая музыка из первого урока для комфортного изучения материала'
    },
    {
      id: 2,
      title: 'Расслабляющая музыка для изучения материала',
      src: musicLesson2,
      description: 'Расслабляющая музыка из второго урока для комфортного изучения материала'
    },
    {
      id: 3,
      title: 'Расслабляющая музыка для изучения материала',
      src: musicLesson3,
      description: 'Расслабляющая музыка из третьего урока для комфортного изучения материала'
    },
    {
      id: 4,
      title: 'Расслабляющая музыка для изучения материала',
      src: musicLesson4,
      description: 'Расслабляющая музыка из четвертого урока для комфортного изучения материала'
    }
  ]

  const images = [
    {
      id: 1,
      title: 'Mark II Aiken Relay Calculator',
      src: imageMarkII,
      description: 'Mark II Aiken Relay Calculator - один из первых компьютеров, на котором был обнаружен первый компьютерный баг'
    },
    {
      id: 2,
      title: 'Первый фактический случай найденного жука',
      src: imageFirstBug,
      description: 'Первый компьютерный баг, обнаруженный 9 сентября 1947 года в Гарвардском университете'
    },
    {
      id: 3,
      title: 'Модель иерархии процессов обеспечения качества',
      src: imageModelHierarchy,
      description: 'Модель иерархии процессов обеспечения качества: тестирование – часть QC, QC – часть QA'
    },
    {
      id: 4,
      title: 'Диаграмма отношения валидации, верификации и тестирования',
      src: imageDiagram,
      description: 'Диаграмма, показывающая взаимосвязь между валидацией, верификацией и тестированием'
    },
    {
      id: 5,
      title: 'Опечатка в макете с именем Гагарина',
      src: imageGagarin,
      description: 'Опечатка в макете на фестивале "ВолгаФест" 2017 года - пример недочета (fault)'
    },
    {
      id: 6,
      title: 'Жизненный цикл дефекта',
      src: imageDefectLifeCycle,
      description: 'Схема жизненного цикла дефекта, показывающая этапы от создания до закрытия'
    },
    {
      id: 7,
      title: 'Ошибка error 404',
      src: animation404Cat,
      description: 'Пример отказа (failure) - ошибка 404, когда страница не найдена'
    }
  ]

  return (
    <div className={`media-page ${theme}`}>
      <section className="media-header">
        <h1>Медиа материалы <CatIcon variant={3} size="1.5em" /></h1>
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
                  {audio.src && (
                    <div className="global-music-controls">
                      <p className="music-hint">💡 Включите фоновую музыку, чтобы она играла на всем сайте</p>
                      <button 
                        className="play-global-music-btn"
                        onClick={() => {
                          try {
                            playMusic(audio.src, audio.title)
                          } catch (error) {
                            console.error('Error playing music:', error)
                          }
                        }}
                        disabled={currentTrack && String(currentTrack.src) === String(audio.src) && isPlaying}
                      >
                        {currentTrack && String(currentTrack.src) === String(audio.src) && isPlaying ? (
                          <>🎵 Музыка играет</>
                        ) : (
                          <>▶️ Включить фоновую музыку</>
                        )}
                      </button>
                    </div>
                  )}
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


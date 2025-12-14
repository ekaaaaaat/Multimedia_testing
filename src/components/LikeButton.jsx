import { useProgress } from '../contexts/ProgressContext'
import './LikeButton.css'

const LikeButton = ({ mediaId, mediaType }) => {
  const { isLiked, toggleLike } = useProgress()
  const liked = isLiked(mediaId, mediaType)

  const handleClick = (e) => {
    e.stopPropagation()
    toggleLike(mediaId, mediaType)
  }

  return (
    <button 
      className={`like-button ${liked ? 'liked' : ''}`}
      onClick={handleClick}
      aria-label={liked ? 'Убрать лайк' : 'Поставить лайк'}
    >
      <span className="like-icon">{liked ? '❤️' : '🤍'}</span>
      <span className="like-text">{liked ? 'Лайкнуто' : 'Лайк'}</span>
    </button>
  )
}

export default LikeButton






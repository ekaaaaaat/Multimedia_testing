import { useTheme } from '../contexts/ThemeContext'
import catSvg from '../assets/Icons/cat-svgrepo-com.svg'
import catCurled from '../assets/Icons/cat-curled-svgrepo-com.svg'
import catScared from '../assets/Icons/cat-scared-svgrepo-com.svg'
import catStretching from '../assets/Icons/cat-streching-svgrepo-com.svg'
import singapuraCat from '../assets/Icons/singapura-cat-svgrepo-com.svg'
import './CatIcon.css'

const catIcons = [
  catSvg,
  catCurled,
  catScared,
  catStretching,
  singapuraCat
]

const CatIcon = ({ variant = 0, size = '1em', className = '' }) => {
  const { theme } = useTheme()
  const iconIndex = variant % catIcons.length
  const iconPath = catIcons[iconIndex]

  return (
    <img
      src={iconPath}
      alt="🐱"
      className={`cat-icon ${theme} ${className}`}
      style={{ width: size, height: size }}
    />
  )
}

export default CatIcon


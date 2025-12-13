import { useTheme } from '../contexts/ThemeContext'
import './PieChart.css'

const PieChart = ({ data, title }) => {
  const { theme } = useTheme()
  
  // Вычисляем углы для каждого сегмента
  let currentAngle = -90 // Начинаем сверху
  const total = data.reduce((sum, item) => sum + item.value, 0)
  
  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100
    const angle = (item.value / total) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle
    currentAngle = endAngle
    
    // Вычисляем координаты для текста
    const midAngle = (startAngle + endAngle) / 2
    const radius = 120
    const textX = Math.cos((midAngle * Math.PI) / 180) * (radius * 0.7)
    const textY = Math.sin((midAngle * Math.PI) / 180) * (radius * 0.7)
    
    // Для больших сегментов (>10%) размещаем текст внутри
    const isLarge = percentage > 10
    const labelX = isLarge ? textX : Math.cos((midAngle * Math.PI) / 180) * (radius * 1.15)
    const labelY = isLarge ? textY : Math.sin((midAngle * Math.PI) / 180) * (radius * 1.15)
    
    return {
      ...item,
      percentage: percentage.toFixed(0),
      startAngle,
      endAngle,
      angle,
      labelX,
      labelY,
      isLarge
    }
  })
  
  const getPath = (startAngle, endAngle, radius = 120) => {
    const start = polarToCartesian(radius, startAngle)
    const end = polarToCartesian(radius, endAngle)
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0
    
    return [
      `M ${radius} ${radius}`,
      `L ${start.x} ${start.y}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
      'Z'
    ].join(' ')
  }
  
  const polarToCartesian = (radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
    return {
      x: radius + radius * Math.cos(angleInRadians),
      y: radius + radius * Math.sin(angleInRadians)
    }
  }
  
  const colors = [
    '#4caf50', // В логике - зеленый
    '#9c27b0', // В документации - фиолетовый
    '#9c27b0', // В вычислениях - фиолетовый (светлее)
    '#2196f3', // В коде - синий
    '#8bc34a', // В управлении данными - зеленый
    '#00bcd4', // В требованиях - голубой
    '#03a9f4', // В интеграции - светло-синий
    '#ff9800'  // В аппаратуре - оранжевый
  ]
  
  return (
    <div className={`pie-chart-container ${theme}`}>
      {title && <h3 className="pie-chart-title">{title}</h3>}
      <div className="pie-chart-wrapper">
        <svg width="300" height="300" viewBox="0 0 300 300" className="pie-chart">
          {segments.map((segment, index) => (
            <g key={index}>
              <path
                d={getPath(segment.startAngle, segment.endAngle)}
                fill={colors[index] || `hsl(${index * 45}, 70%, 60%)`}
                className="pie-segment"
                style={{ 
                  opacity: 0.9,
                  filter: theme === 'dark' ? 'brightness(1.1)' : 'none'
                }}
              />
              {segment.percentage > 3 && (
                <text
                  x={segment.labelX + 150}
                  y={segment.labelY + 150}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`pie-label ${segment.isLarge ? 'large' : 'small'}`}
                  fill={segment.isLarge ? '#fff' : (theme === 'dark' ? '#e0e0e0' : '#333')}
                  fontSize={segment.isLarge ? '16' : '12'}
                  fontWeight="600"
                >
                  {segment.percentage}%
                </text>
              )}
            </g>
          ))}
        </svg>
        <div className="pie-legend">
          {segments.map((segment, index) => (
            <div key={index} className="legend-item">
              <div 
                className="legend-color" 
                style={{ backgroundColor: colors[index] || `hsl(${index * 45}, 70%, 60%)` }}
              />
              <span className="legend-label">{segment.label}</span>
              <span className="legend-value">{segment.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PieChart


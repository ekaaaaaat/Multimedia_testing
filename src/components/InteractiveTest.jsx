import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import './InteractiveTest.css'

const InteractiveTest = ({ questions }) => {
  const { theme } = useTheme()
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(null)

  const handleAnswer = (questionId, answerIndex) => {
    if (!submitted) {
      setAnswers({ ...answers, [questionId]: answerIndex })
    }
  }

  const handleSubmit = () => {
    let correct = 0
    questions.forEach(q => {
      if (answers[q.id] === q.correct) {
        correct++
      }
    })
    setScore(correct)
    setSubmitted(true)
  }

  const handleReset = () => {
    setAnswers({})
    setSubmitted(false)
    setScore(null)
  }

  return (
    <div className={`interactive-test ${theme}`}>
      <div className="test-questions">
        {questions.map((q, index) => {
          const isCorrect = submitted && answers[q.id] === q.correct
          const isWrong = submitted && answers[q.id] !== q.correct && answers[q.id] !== undefined

          return (
            <div key={q.id} className={`question-block ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}>
              <h3>{index + 1}. {q.question}</h3>
              <div className="options">
                {q.options.map((option, optIndex) => (
                  <label
                    key={optIndex}
                    className={`option ${answers[q.id] === optIndex ? 'selected' : ''} ${submitted && optIndex === q.correct ? 'correct-answer' : ''}`}
                  >
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={optIndex}
                      checked={answers[q.id] === optIndex}
                      onChange={() => handleAnswer(q.id, optIndex)}
                      disabled={submitted}
                    />
                    <span>{option}</span>
                    {submitted && optIndex === q.correct && (
                      <span className="checkmark">✓</span>
                    )}
                  </label>
                ))}
              </div>
              {submitted && isWrong && (
                <p className="feedback">Неверно. Правильный ответ: {q.options[q.correct]}</p>
              )}
              {submitted && isCorrect && (
                <p className="feedback correct-feedback">Правильно! ✓</p>
              )}
            </div>
          )
        })}
      </div>

      <div className="test-actions">
        {!submitted ? (
          <button onClick={handleSubmit} className="submit-btn">
            Проверить ответы
          </button>
        ) : (
          <div className="results">
            <div className="score-display">
              <h3>Результат: {score} из {questions.length}</h3>
              <p className="score-percentage">
                {Math.round((score / questions.length) * 100)}% правильных ответов
              </p>
            </div>
            <button onClick={handleReset} className="reset-btn">
              Пройти заново
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default InteractiveTest


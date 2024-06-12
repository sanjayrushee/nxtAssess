import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Header from '../Header'

import './index.css'

const Results = () => {
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0)
  const [timeINSecs, setTimeINSecs] = useState(0)
  const [isTimerRunningEnd, setIsTimerRunning] = useState(false)
  const [timerLimitInMinutes, setTimerLimitInMinutes] = useState(0)

  useEffect(() => {
    const storedData = localStorage.getItem('quizResults')
    if (storedData) {
      const data = JSON.parse(storedData)
      setCorrectAnswerCount(data.correctAnswerCount)
      setTimeINSecs(data.timeINSecs)
      setIsTimerRunning(data.isTimerRunningEnd)
      setTimerLimitInMinutes(data.timerLimitInMinutes)
    }
  }, [])

  const stringifiedMinutes =
    timerLimitInMinutes > 9 ? timerLimitInMinutes : `0${timerLimitInMinutes}`
  const stringifiedSeconds = timeINSecs > 9 ? timeINSecs : `0${timeINSecs}`

  return (
    <>
      <Header />
      {isTimerRunningEnd ? (
        <div className="main-container-result">
          <div className="sub-container-timeUp">
            <div>
              <img
                src="https://res.cloudinary.com/dk37xrzzu/image/upload/v1717476993/nxtwave/complete_pcqozg.png"
                alt="time up"
                className="timeUp-image"
              />
            </div>
            <div>
              <h1 className="timeUp-heading-timeUp">Time is up!</h1>
              <p className="failed-para-timeUp">
                You did not complete the assessment within the time.
              </p>
              <h1 className="score-heading-timeUp">
                Your Score{' '}
                <span className="span-score-timeUp">{correctAnswerCount}</span>
              </h1>
              <Link to="/assessment">
                <button className="button-result" type="button">
                  Reattempt
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="main-container-result">
          <div className="sub-container-result">
            <img
              src="https://res.cloudinary.com/dk37xrzzu/image/upload/v1717476993/nxtwave/complete_pcqozg.png"
              alt="submit"
              className="result-image"
            />
            <div>
              <h1 className="congrats-heading">
                Congrats! You completed the assessment.
              </h1>
              <p className="time-taken-para-result">
                <span className="span-time-result"> Time Taken</span> 00:
                {stringifiedMinutes}:{stringifiedSeconds}
              </p>
              <p className="score-heading-result">
                Your Score:
                <span className="span-score-result">{correctAnswerCount}</span>
              </p>
              <Link to="/assessment">
                <button className="button-result" type="button">
                  Reattempt
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Results

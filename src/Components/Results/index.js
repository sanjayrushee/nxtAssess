import {Link} from 'react-router-dom'
import './index.css'

const Results = props => {
  const {
    correctAnswerCount,
    timeINSecs,
    isTimerRunning,
    timerLimitInMinutes,
  } = props

  return (
    <div className="main-container-result">
      {isTimerRunning ? (
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
            <Link to="/">
              <button className="button-result" type="button">
                Reattempt
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="sub-container-result">
          <img
            src="https://res.cloudinary.com/dk37xrzzu/image/upload/v1717476993/nxtwave/complete_pcqozg.png"
            alt="result logo"
            className="result-image"
          />
          <div>
            <h1 className="congrats-heading">
              Congrats! You completed the assessment.
            </h1>
            <p className="time-taken-para-result">
              <span className="span-time-result"> Time Taken:</span> 00:
              {timerLimitInMinutes}:{timeINSecs}
            </p>
            <h1 className="score-heading-result">
              Your Score:{' '}
              <span className="span-score-result">{correctAnswerCount}</span>
            </h1>
            <Link to="/">
              <button className="button-result" type="button">
                Reattempt
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Results

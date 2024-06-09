import {Component, useEffect} from 'react'
import {Route, Redirect, Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Results from '../Results'
import ProductRoute from '../Route'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Assessment extends Component {
  state = {
    total: '',
    questions: [],
    apiStatus: apiStatusConstants.initial,
    correctAnswer: '',
    oderOfQuestions: 0,
    AnswerQuestions: 0,
    correctAnswerCount: 0,
    isTimerRunning: false,
    isAssessmentFinished: false,
    timeINSecs: 0,
    timerLimitInMinutes: 1,
    disableClick: false,
  }

  componentDidMount() {
    this.getData()
    this.timerId = setInterval(this.timeElapsed, 1000)
  }

  // Time Calculation
  timeINMIn = () => {
    const {timerLimitInMinutes} = this.state
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
    }))
    if (timerLimitInMinutes < 1) {
      this.setState({timerLimitInMinutes: 0})
    }
  }

  timeINSec = () => {
    this.setState(prevState => ({
      timeINSecs: prevState.timeINSecs - 1,
    }))
  }

  timeElapsed = () => {
    const {timerLimitInMinutes, timeINSecs} = this.state

    if (timeINSecs === 0 && timerLimitInMinutes === 0) {
      clearInterval(this.timerId)
      this.setState({
        timeINSecs: 0,
        timerLimitInMinutes: 0,
        isTimerRunning: true,
      })
      console.log('time end')
    } else if (timeINSecs === 0 && timerLimitInMinutes !== 0) {
      this.timeINMIn()
      this.setState({timeINSecs: 59})
    } else {
      this.timeINSec()
    }
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeINSecs} = this.state
    // console.log(timerLimitInMinutes, timeINSec)

    const stringifiedMinutes =
      timerLimitInMinutes > 9 ? timerLimitInMinutes : `0${timerLimitInMinutes}`
    const stringifiedSeconds = timeINSecs > 9 ? timeINSecs : `0${timeINSecs}`
    return `00:${stringifiedMinutes}:${stringifiedSeconds}`
  }

  // Result page
  resultPage = () => {
    const {
      correctAnswerCount,
      timeINSecs,
      isTimerRunning,
      timerLimitInMinutes,
    } = this.state

    return (
      <ProductRoute
        exact
        path="/results"
        render={props => (
          <Results
            {...props}
            correctAnswerCount={correctAnswerCount}
            timeINSecs={timeINSecs}
            timerLimitInMinutes={timerLimitInMinutes}
            isTimerRunning={isTimerRunning}
          />
        )}
      />
    )
  }

  // getting the data from api
  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/assess/questions'
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      const updateTotal = data.total
      const updateQuestions = data.questions.map(qu => ({
        id: qu.id,
        optionType: qu.options_type,
        questionText: qu.question_text,
        options: qu.options.map(op => ({
          id: op.id,
          text: op.text,
          isCorrect: op.is_correct,
        })),
      }))
      this.setState({
        total: updateTotal,
        questions: updateQuestions,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  // get the option
  onClickOption = event => {
    const newId = event.target.id
    const listItems = document.querySelectorAll('li.option-Lists-clicked')
    this.setState({
      correctAnswer: newId,
    })

    listItems.forEach(item => {
      item.classList.remove('option-Lists-clicked')
    })
    event.target.classList.add('option-Lists-clicked')
  }

  // Change the questions and remove questions
  onClickChangeQue = () => {
    const {correctAnswer, questions, total, oderOfQuestions} = this.state
    if (correctAnswer === 'true') {
      this.setState(prevState => ({
        correctAnswerCount: prevState.correctAnswerCount + 1,
      }))
    }

    if (correctAnswer !== '' && questions.length !== 1) {
      const {id} = questions[oderOfQuestions]
      const updatedQuestions = questions.filter(each => each.id !== id)
      this.setState(prevState => ({
        AnswerQuestions: prevState.AnswerQuestions + 1,
        correctAnswer: '',
        total: prevState.total - 1,
        questions: updatedQuestions,
        oderOfQuestions: 0,
      }))
    } else if (questions.length === 1) {
      console.log('this line execute')
      clearInterval(this.timerId)
      this.setState({isAssessmentFinished: true})
      return
    }

    if (oderOfQuestions === total) {
      this.setState({oderOfQuestions: 0})
    } else if (oderOfQuestions < questions.length - 1) {
      this.setState(prevState => ({
        oderOfQuestions: prevState.oderOfQuestions + 1,
      }))
    }
  }

  // submit the questions
  onSubmitQuestion = () => {
    const {correctAnswer} = this.state
    if (correctAnswer === 'true') {
      this.setState(prevState => ({
        correctAnswerCount: prevState.correctAnswerCount + 1,
      }))
    }
    console.log('this line execute')
    clearInterval(this.timerId)
    // return this.setState({isAssessmentFinished: true})
  }

  ClickedOnQuestionNumber = event => {
    const QNum = event.target.id
    this.setState({oderOfQuestions: QNum - 1})
  }

  QuestionsListByNumber = () => {
    const questionNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const {disableClick} = this.state
    return (
      <ul className="question-number-OrderList ">
        {questionNumbers.map(each => (
          <li
            id={each}
            className="question-numbers-lists"
            onClick={disableClick ? null : this.ClickedOnQuestionNumber}
          >
            {each}
          </li>
        ))}
      </ul>
    )
  }

  // options for questions according to type
  optionOfQuestion = (optionType, options) => {
    switch (optionType) {
      case 'DEFAULT':
        return options.map(option => (
          <ul className="option-unOrderList">
            <li
              key={option.id}
              className="option-Lists "
              onClick={this.onClickOption}
              id={option.isCorrect}
            >
              <p>{option.text}</p>
            </li>
          </ul>
        ))
      case 'IMAGE':
        return options.map(option => (
          <ul className="option-unOrderList">
            <li
              key={option.id}
              className="option-Lists"
              id={option.isCorrect}
              onClick={this.onClickOption}
            >
              <p>{option.text}</p>
            </li>
          </ul>
        ))
      case 'SINGLE_SELECT':
        return (
          <select className="select-options">
            {options.map(option => (
              <option
                key={option.id}
                id={option.isCorrect}
                onClick={this.onClickOption}
              >
                {option.text}
              </option>
            ))}
          </select>
        )

      default:
        return null
    }
  }

  SuccessContainer = () => {
    const {questions, oderOfQuestions, total, AnswerQuestions} = this.state
    // console.log(correctAnswer)
    const {questionText, optionType, options} = questions[oderOfQuestions]
    return (
      <>
        <div className="main-container-assessment">
          <div className="sub-container-assessment">
            <div className="time-left-container">
              <p className="timer-left-para">Time Left</p>
              <p className="timer-left-para">
                {this.getElapsedSecondsInTimeFormat()}
              </p>
            </div>
            <div className="count-of-questions-container">
              <p className="question-count-para">
                <span className="span-que span-answered">
                  {AnswerQuestions}
                </span>
                Answered Questions{' '}
              </p>
              <p className="question-count-para">
                <span className="span-que span-Unanswered">{total}</span>
                Unanswered Questions
              </p>
            </div>
            <hr />
            <div>
              <p className="question-para-withBracket">Questions (10)</p>
              {this.QuestionsListByNumber()}
            </div>
            <div className="sub-button-container">
              <Link to="/results">
                <button
                  className="submit-button"
                  type="submit"
                  onClick={this.onSubmitQuestion}
                >
                  Submit Assessment{' '}
                </button>
              </Link>
            </div>
          </div>
          <div className="question-container-assessment">
            <p className="asking-question-para">{questionText}</p>
            <hr className="hr-in-question-ans" />
            <div className="option-container-list">
              {this.optionOfQuestion(optionType, options)}
            </div>
            {total === 1 ? (
              ''
            ) : (
              <div className="next-button-container">
                <button
                  type="button"
                  className="next-question-button"
                  onClick={this.onClickChangeQue}
                >
                  Next Question
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    )
  }

  loaderFunction = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#263868" height={50} width={50} />
    </div>
  )

  failView = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dk37xrzzu/image/upload/v1717476993/nxtwave/somethingwentwrong_fupwxs.png"
        alt="Something went Wrong"
        className="oops-image-ass"
      />
      <div>
        <h1>Oops! Something went wrong</h1>
        <p>We are having some trouble</p>
        <button type="button" onClick={this.getData}>
          Retry
        </button>
      </div>
    </div>
  )

  finalRender = () => {
    const {apiStatus, isAssessmentFinished, isTimerRunning} = this.state

    if (isAssessmentFinished || isTimerRunning) {
      return this.resultPage()
    }

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.loaderFunction()
      case apiStatusConstants.success:
        return this.SuccessContainer()
      case apiStatusConstants.failure:
        return this.failView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.finalRender()}
      </>
    )
  }
}

export default Assessment

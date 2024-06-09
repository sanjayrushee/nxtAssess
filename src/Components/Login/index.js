import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    ErrorMsg: '',
    ErrorMsgState: false,
    ShowPassword: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  usernameContainer = () => {
    const {username} = this.state

    return (
      <>
        <label htmlFor="username" className="login-label">
          USERNAME
        </label>

        <input
          type="text"
          id="username"
          placeholder="username"
          value={username}
          className="login-input"
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  passwordContainer = () => {
    const {password, ShowPassword} = this.state

    return (
      <>
        <label htmlFor="password" className="login-label">
          PASSWORD
        </label>

        <input
          type={ShowPassword ? 'text' : 'password'}
          id="password"
          placeholder="password"
          value={password}
          className="login-input"
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  onSubmitSuccess = JWTtoken => {
    const {history} = this.props
    Cookies.set('jwt_token', JWTtoken, {expires: 30})
    history.replace('/')
  }

  onSubmitFails = msg => {
    this.setState({ErrorMsgState: true, ErrorMsg: msg})
  }

  onShowPassword = () => {
    this.setState(prevState => ({ShowPassword: !prevState.ShowPassword}))
  }

  getData = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POSt',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFails(data.error_msg)
    }
  }

  render() {
    const {ErrorMsg, ErrorMsgState} = this.state

    return (
      <div className="main-container-login">
        <div className="sub-container-login">
          <div className="image-container-login">
            <img
              src="https://res.cloudinary.com/dk37xrzzu/image/upload/v1717753696/nxtwave/logo_pelrmu.png"
              alt="login website logo"
              className="logo-login-page"
            />
          </div>
          <form onSubmit={this.getData} className="from-container-login">
            {this.usernameContainer()}
            {this.passwordContainer()}
            <div>
              <input
                type="checkbox"
                onChange={this.onShowPassword}
                id="ShowPassword"
              />
              <label className="show-password-label" htmlFor="ShowPassword">
                Show password
              </label>{' '}
            </div>
            <button type="submit" className="login-button">
              Login{' '}
            </button>
            {ErrorMsgState ? (
              <p className="error-para-login">{ErrorMsg}</p>
            ) : (
              ' '
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default Login

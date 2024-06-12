import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="main-container-header">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dk37xrzzu/image/upload/v1717756830/nxtwave/whitelogo_merb5u.png"
          alt="website logo"
          className="logo-header"
        />
      </Link>
      <div>
        <button className="button-header" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)

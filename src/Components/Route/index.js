import Cookies from 'js-cookie'
import {Redirect, Route} from 'react-router-dom'

const ProductRoute = props => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProductRoute

import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css'
import Login from './Components/Login'
import Home from './Components/Home'
import ProductRoute from './Components/Route'
import Assessment from './Components/Assessment'
import Results from './Components/Results'
import NotFound from './Components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProductRoute exact path="/" component={Home} />
    <ProductRoute exact path="/assessment" component={Assessment} />
    <ProductRoute exact path="/results" component={Results} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App

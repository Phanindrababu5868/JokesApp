import {Route, Switch} from 'react-router-dom'

import LoginPage from './components/Login'

import HomePage from './components/Home'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/" component={HomePage} />
  </Switch>
)

export default App

import {Component} from 'react'
import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginPage extends Component {
  state = {
    userName: '',
    password: '',
    showUserNameError: false,
    showPassWordError: false,
    showErrorMsg: false,
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onBlurUserName = () => {
    const {userName} = this.state
    if (userName === '') {
      this.setState({showUserNameError: true})
    }
  }

  onBlurPassWord = () => {
    const {password} = this.state

    if (password === '') {
      this.setState({showPassWordError: true})
    }
  }

  renderPasswordSection = () => {
    const {passwordInput, showPassWordError} = this.state

    const className = showPassWordError
      ? 'input-field error-field'
      : 'input-field'

    return (
      <div className="input-section-container">
        <label htmlFor="password" className="label">
          PASSWORD
        </label>
        <input
          className={className}
          type="password"
          id="password"
          placeholder="password"
          value={passwordInput}
          onChange={this.onChangePassword}
          onBlur={this.onBlurPassWord}
        />
        {showPassWordError && <p className="error-message">Required</p>}
      </div>
    )
  }

  renderUsernameSection = () => {
    const {userNameInput, showUserNameError} = this.state

    const className = showUserNameError
      ? 'input-field error-field'
      : 'input-field'
    return (
      <div className="input-section-container">
        <label htmlFor="userName" className="label">
          USERNAME
        </label>
        <input
          className={className}
          id="userName"
          placeholder="Username"
          type="text"
          value={userNameInput}
          onChange={this.onChangeUserName}
          onBlur={this.onBlurUserName}
        />
        {showUserNameError && <p className="error-message">Required</p>}
      </div>
    )
  }

  onSubmitForm = event => {
    const {history} = this.props
    event.preventDefault()

    const {userName, password} = this.state
    if (userName === '') {
      this.setState({showUserNameError: true})
    }
    if (password === '') {
      this.setState({showPassWordError: true})
    }
    if (userName === 'Phanindra' || userName === 'Babu') {
      if (userName === 'Phanindra' && password === 'Phani@1234') {
        Cookies.set('jwt_token', 'welcome back Phanindra')
        console.log(Cookies.get('jwt_token'))
        history.replace('/')
      } else if (userName === 'Babu' && password === 'Babu@1234') {
        Cookies.set('jwt_token', 'welcome back Babu')
        history.replace('/')
        console.log(Cookies.get('jwt_token'))
      } else {
        this.setState({showErrorMsg: true})
        console.log('hi from in else')
      }
    } else {
      this.setState({showErrorMsg: true})
    }
  }

  render() {
    const {showErrorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="app-container">
        <div className="responsiveContainer">
          <h1 className="app-name">Jokes App</h1>
          <form onSubmit={this.onSubmitForm} className="form-container">
            {this.renderUsernameSection()}
            {this.renderPasswordSection()}
            <button className="button" type="submit">
              Login
            </button>
            {showErrorMsg ? (
              <p className="error-message">*check username and password</p>
            ) : null}
          </form>
        </div>
        <div className="popup-container">
          <Popup
            trigger={
              <button type="button" className="trigger-button bg-warning">
                Sample Credentials
              </button>
            }
            className="user-credentials-container text-white"
            position="bottom left"
          >
            <p>
              username: <span className="user-name">Phanindra</span>
            </p>
            <p>password: Phani@1234</p>
            <hr />
            <p>username: Babu</p>
            <p>password: Babu@1234</p>
            <hr />
          </Popup>
        </div>
      </div>
    )
  }
}

export default LoginPage

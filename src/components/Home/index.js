import {Component} from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import {AiOutlineReload} from 'react-icons/ai'
import {Redirect} from 'react-router-dom'
import {TailSpin} from 'react-loader-spinner'
import Cookies from 'js-cookie'

import ListElement from '../ListElement'

import './index.css'

class HomePage extends Component {
  state = {jokesList: [], isLoading: true}

  componentDidMount() {
    this.fetchDetails()
  }

  fetchDetails = async () => {
    const url =
      'https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10'
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({jokesList: data.jokes, isLoading: false})
    }
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onReloadPage = () => {
    window.location.reload()
  }

  renderJokesTable = () => {
    const {jokesList} = this.state
    return (
      <>
        <div className="d-flex flex-column text-center min-height-100vh">
          <p className="text-success bg-dark description mt-4 mb-3 text-center">
            Welcome to the jokes App, here you read top 10 random jokes.
          </p>
        </div>
        <table className="jokes mb-5">
          {jokesList.map(each => (
            <ListElement joke={each.joke} category={each.category} />
          ))}
        </table>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="profile-loader-container">
      <TailSpin color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="container pt-1 bg-dark home-bg-container pb-4">
        <navbar className="d-flex flex-row justify-content-between p-3 bg-dark border border-white">
          <h1 className="navbar-app-name">Jokes App</h1>
          <div>
            <button
              type="button"
              className="btn-dark btn mr-3"
              onClick={this.onReloadPage}
            >
              <AiOutlineReload className="reload-icon" />
              <br />
              reload
            </button>

            <button
              type="button"
              className="btn btn-primary "
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </div>
        </navbar>
        {isLoading ? (
          <div className="m-5 text-center">{this.renderLoadingView()}</div>
        ) : (
          <div className="mb-5">{this.renderJokesTable()}</div>
        )}

        <button
          type="button"
          className="btn btn-warning text-white"
          onClick={this.onReloadPage}
        >
          reload
        </button>
      </div>
    )
  }
}

export default HomePage

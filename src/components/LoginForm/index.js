import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {userId: '', pin: '', errormessage: '', isError: false}

  success = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  changeUserId = event => {
    this.setState({userId: event.target.value})
  }

  changePin = event => {
    this.setState({pin: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const url = 'https://apis.ccbp.in/ebank/login'
    const userDetails = {user_id: userId, pin}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      this.success(data.jwt_token)
    } else {
      this.setState({errormessage: data.error_msg, isError: true})
    }
  }

  render() {
    const {errormessage, userId, pin, isError} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="background-container-login">
        <div className="login-form-container">
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="image-login"
            />
          </div>

          <div className="form-backgroud-container">
            <h1 className="welcom-text">Welcome Back!</h1>
            <form className="form-input-container" onSubmit={this.submitForm}>
              <label className="label-text" htmlFor="userId">
                User ID
              </label>
              <input
                type="text"
                id="userId"
                className="input-element"
                placeholder="Enter User ID"
                onChange={this.changeUserId}
                value={userId}
              />
              <br />
              <label className="label-text" htmlFor="pin">
                PIN
              </label>
              <input
                type="password"
                id="pin"
                className="input-element"
                placeholder="Enter PIN"
                onChange={this.changePin}
                value={pin}
              />
              <button type="submit" className="login-button">
                Login
              </button>
              {isError === true && <p className="error">{errormessage}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default LoginForm

import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import FacebookLoginButton from './FacebookLoginButton'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebookF, faFacebook} from '@fortawesome/free-brands-svg-icons'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="container">
      <div className="main-container  col-sm-12 col-md-8 offset-md-2">
        <form onSubmit={handleSubmit} name={name}>
          <h2 className="text-center">{name.toUpperCase()}</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input name="email" type="text" className="form-control" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              required
            />
          </div>
          {props.name === 'signup' ? (
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                name="username"
                type="text"
                required
                className="form-control"
              />
            </div>
          ) : null}
          <div>
            <button type="submit" className="btn btn-primary">
              {displayName}
            </button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href="/auth/facebook">
          <button type="button" className="btn btn-facebook">
            {displayName} with Facebook &nbsp;{' '}
            <FontAwesomeIcon icon={faFacebook} />
          </button>
        </a>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapSignupDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const userName = evt.target.username.value
      dispatch(auth(email, password, formName, userName))
    }
  }
}

const mapLoginDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapLoginDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapSignupDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHandPointUp} from '@fortawesome/free-solid-svg-icons'

const Navbar = ({handleClick, isLoggedIn, username}) => (
  <div>
    <nav className="navbar navbar-expand-lg">
      <div className="navbar-brand">
        <div className="logo">
          <Link to="/">
            <img src="./whiteLogo.png" />
          </Link>
        </div>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarLinks"
        aria-controls="navbarLinks"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarLinks">
        <ul className="navbar-nav mr-auto">
          {/* if user is logged in display the link to start playing otherwise link them to sign up */}
          {isLoggedIn ? (
            <li className="nav-item">
              <Link to="/home" className="nav-link">
                Play
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
            </li>
          )}
          {isLoggedIn ? (
            <li>
              <Link to="/home" className="nav-link">
                {' '}
                Logged in as {username}
              </Link>
            </li>
          ) : null}
          {/* if user is logged in display the link to log out otherwise link them to log in */}
          {isLoggedIn ? (
            <li className="nav-item">
              <a href="#" onClick={handleClick} className="nav-link">
                Logout
              </a>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    username: state.user.userName
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

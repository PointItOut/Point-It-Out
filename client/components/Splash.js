import React from 'react'
import {Link} from 'react-router-dom'
import {Instructions} from './index'
import {connect} from 'react-redux'

const Splash = ({isLoggedIn}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="main-container text-center col-sm-12 col-md-8 offset-md-2">
          <h1 className="display-1">Point It Out</h1>
          <h2>A fast paced trivia game for the whole family!</h2>
          {/* if they are signed in show a play button
      otherwise display a signup or login button */}
          {isLoggedIn ? (
            <button type="button" className="btn btn-main">
              <Link to="home">Play</Link>
            </button>
          ) : (
            <span>
              <button type="button" className="btn btn-main">
                <Link to="/signup">Signup</Link>
              </button>
              <button type="button" className="btn btn-main">
                <Link to="/login">Login</Link>
              </button>
            </span>
          )}
          {/* button to open modal with instructions */}
          <button
            type="button"
            className="btn btn-main"
            data-toggle="modal"
            data-target="#instructionModal"
          >
            How to Play
          </button>f
        </div>
      </div>
      <Instructions />
    </div>
  )
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}
export default connect(mapState)(Splash)

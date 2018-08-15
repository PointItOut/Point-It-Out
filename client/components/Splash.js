import React from 'react'
import {Link} from 'react-router-dom'
import {Instructions} from './index'
import {connect} from 'react-redux'

const Splash = ({isLoggedIn}) => {
  return (
    <div className="container">
      <h1>Point It Out</h1>
      <h2>A fast paced trivia game for the whole family!</h2>

      {/* if they are signed in show a play button
      otherwise display a signup or login button */}
      {isLoggedIn ? (
        <button type="button" className="btn btn-info">
          <Link to="home">Play</Link>
        </button>
      ) : (
        <span>
          <button type="button" className="btn btn-info">
            <Link to="/signup">Signup</Link>
          </button>
          <button type="button" className="btn btn-info">
            <Link to="/login">Login</Link>
          </button>
        </span>
      )}
      {/* button to open modal with instructions */}
      <button
        type="button"
        className="btn btn-info"
        data-toggle="modal"
        data-target="#instructionModal"
      >
        How to Play
      </button>
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

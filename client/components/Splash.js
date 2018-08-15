import React from 'react'
import {Link} from 'react-router-dom'
import {Instructions} from './index'
const Splash = props => {
  return (
    <div className="container">
      <h1>Point It Out</h1>
      <h2>A fast paced trivia game for the whole family!</h2>
      {/* button to open modal with instructions */}
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#instructionModal"
      >
        How to Play
      </button>
      <Instructions />

      {/* if they are signed in give a play button
      otherwise display a signup or login button */}
      <button type="button" className="btn btn-info">
        Play
      </button>
    </div>
  )
}

export default Splash

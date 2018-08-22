import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const Instructions = props => {
  return (
    <div
      className="modal fade"
      id="instructionModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="instructionModal"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="text-center" id="instructionModalLabel">
              Game Play
            </h3>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <ol>
              <li>Each round is 60 seconds long</li>
              <li>The question displays at the bottom of the webcam and the choices at the top</li>
              <li>After guessing, the correct answer will be shown with a green border</li>
              <li>If you guessed incorrectly, your answer will be displayed with a red border</li>
              <li>Each correct answer is worth 1 point</li>
              <li>Play by yourself or start a game with friends</li>
              <li>The game ends when the time is up</li>
              <li>Whoever gets the most points wins the round and gets a crown!</li>
            </ol>
            <h4>Tips</h4>
            <ol>
              <li>Place your computer on a stable surface</li>
              <li>Position yourself so you are below the row of answers</li>
              <li>Make sure you are in a place that is well-lit</li>
              <li>Don't be hesitant! Tap the box of your choice decisively!</li>
            </ol>
          </div>
          <button className="btn btn-primary" onClick={props.handleClick} data-dismiss="modal">Practice!</button>
        </div>
      </div>
    </div>
  )
}

export default Instructions

// PROP TYPES
Instructions.propTypes = {
  handleClick: PropTypes.func
}

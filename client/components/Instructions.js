import React from 'react'

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
              <li>Each round is 30 seconds long</li>
              <li>Once you guess, you may move on to the next question </li>
              <li>Each correct answer is worth 1 point</li>
              <li>Whoever gets the most points wins the round!</li>
            </ol>
            <h4>Tips</h4>
            <ol>
              <li>Stand with the top of your head below the row of answers</li>
              <li>Make sure you are well lit</li>
              <li>Tap the card with your choice vigorously</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Instructions

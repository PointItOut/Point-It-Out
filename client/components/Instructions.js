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
            <h5 className="modal-title" id="exampleModalLabel">
              How to Play
            </h5>
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
            Instructions go here (can be images, text, video etc)
          </div>
        </div>
      </div>
    </div>
  )
}

export default Instructions

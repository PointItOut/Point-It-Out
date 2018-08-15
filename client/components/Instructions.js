import React from 'react'

const Instructions = props => {
  return (
    <div
      class="modal fade"
      id="instructionModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="instructionModal"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
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

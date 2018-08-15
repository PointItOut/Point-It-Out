import React, {Component} from 'react'
impo

renderModeOptions() {
  const {chooseMode} = this.props
  return (
    <div>
      <button
        type="button"
        className="btn btn-info"
        onClick={() => chooseMode('solo')}
      >
        Challenge Yourself!
      </button>
      <button
        type="button"
        className="btn btn-info"
        onClick={() => chooseMode('partner')}
      >
        Challenge a Friend!
      </button>
    </div>
  )
}

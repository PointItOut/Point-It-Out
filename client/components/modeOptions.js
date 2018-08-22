import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import {AddGame} from '.'
import {isScreenLarge, tooSmallToast} from '../canPlay'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faChevronCircleLeft,
  faChevronCircleRight
} from '@fortawesome/free-solid-svg-icons'

class ModeOptions extends Component {
  constructor() {
    super()
    this.state = {partnerMode: false}
    this.handleChooseMode = this.handleChooseMode.bind(this)
  }
  handleChooseMode(currentMode) {
    if (isScreenLarge()) {
      if (currentMode === 'partner') {
        this.setState({partnerMode: true})
      }
      const {loadQuestions} = this.props
      //load questions dispatches a thunk to get the questions and  dispatch an action to put them on state and redirect the user to the play page
      loadQuestions(this.props.chosenCategory, currentMode)
    } else tooSmallToast()
  }

  render() {
    const {resetCategory} = this.props
    return (
      <div>
        <h4>Step 2: Choose a mode</h4>
        <button
          type="button"
          className="btn btn-main"
          onClick={() => this.handleChooseMode('solo')}
        >
          Start Solo Game
        </button>
        <button
          type="button"
          className="btn btn-main"
          onClick={() => this.handleChooseMode('partner')}
        >
          Create Multiplayer Game
        </button>
        {this.state.partnerMode ? <AddGame /> : null}
        <div className="row">
          <div className="col-sm-10">
            <FontAwesomeIcon
              icon={faChevronCircleLeft}
              size="2x"
              onClick={() => resetCategory()}
            />
          </div>
          <div className="col-sm-1" />
        </div>
      </div>
    )
  }
}

export default ModeOptions

// PROP TYPES
ModeOptions.propTypes = {
  chooseMode: PropTypes.func,
  chosenCategory: PropTypes.object
}

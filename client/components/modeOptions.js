import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import AddGame from '.'

class ModeOptions extends Component {
  constructor() {
    super()
    this.state = {partnerMode: false}
    this.handleChooseMode = this.handleChooseMode.bind(this)
  }
  handleChooseMode(currentMode) {
    if (currentMode === 'partner') {
      this.setState({partnerMode: true})
    }
    const {loadQuestions} = this.props
    //load questions dispatches a thunk to get the questions and  dispatch an action to put them on state and redirect the user to the play page
    loadQuestions(this.props.chosenCategory, currentMode)
  }

  render() {
    const {chooseMode} = this.props
    return (
      <div>
        <h2>{this.props.chosenCategory}</h2>
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
        {this.state.partnerMode ? <AddGame /> : null}
      </div>
    )
  }
}

export default ModeOptions

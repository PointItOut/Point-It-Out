import React, {Component} from 'react'
import {connect} from 'react-redux'
import CameraCanvas from './CameraCanvas'

class SoloMode extends Component {
  constructor() {
    super()
  }

  render() {
    const questions = this.props.questions
    return (
      <div>
        <h2>Solo Mode</h2>
        <CameraCanvas questions={questions} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    category: state.category,
    questions: state.questions
  }
}

export default connect(mapState)(SoloMode)

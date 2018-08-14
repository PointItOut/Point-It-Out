import React, {Component} from 'react'
import {connect} from 'react-redux'
import { CameraCanvas, GameSidebar } from './index'

class SoloMode extends Component {
  constructor() {
    super()
  }

  render() {
    const questions = this.props.questions
    return (
      <div className="game-wrapper">
        <CameraCanvas questions={questions} />
        <GameSidebar />
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

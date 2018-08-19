import React, {Component} from 'react'
import {connect} from 'react-redux'
import { getTutorialQuestions } from '../store/questions'
import { CameraCanvas } from './index'

// tutorial component must use webcam and canvas...
// how to use diffy though?
// do we need a special tutorial sidebar?
// make sure we reset everything at the end of the 'game'...


class TutorialMode extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const { fetchTutorialQuestions } = this.props
    fetchTutorialQuestions()
  }



  render() {
    const { questions } = this.props
    return (
    <div>
      <CameraCanvas questions={questions} />
    </div>
    )
  }
}

const mapState = state => ({
  questions: state.questions,
  currentQuestion: state.currentQuestion
})

const mapDispatch = dispatch => ({
  fetchTutorialQuestions: () => dispatch(getTutorialQuestions())
})

export default connect(mapState, mapDispatch)(TutorialMode)

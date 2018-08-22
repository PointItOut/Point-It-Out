import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { getTutorialQuestions, deleteQuestions } from '../store/questions'
import { setQuestion } from '../store/currentQuestion'
import { updateScore } from '../store/score'
import { CameraCanvas } from './index'

class TutorialMode extends Component {
  constructor() {
    super()
    this.handleExit = this.handleExit.bind(this)
  }

  componentDidMount() {
    const { fetchTutorialQuestions } = this.props
    fetchTutorialQuestions()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.questions !== this.props.questions) {
      const { setInitialQuestion, questions } = this.props
      setInitialQuestion(questions[0])
    }
  }

  handleExit() {
    const { history, clearCurrentQuestion, clearQuestions, resetScore } = this.props
    clearCurrentQuestion()
    clearQuestions()
    resetScore()
    history.push('/')
  }

  render() {
    const { questions, currentQuestion } = this.props
    const endOfTutorial = (currentQuestion.text === 'Touch the blue square') && (currentQuestion.userGuess !== null)

    return (
    <div className="tutorial game-wrapper">
      <CameraCanvas questions={questions} tutorialMode={true} />

      <div className="container" id="tutorial-sidebar">
        <div className="card">
          <div className="card-header accent-header">
            <h4 className="text-center">TUTORIAL</h4>
          </div>
          <div className="card-body">
            <h4 className="tutorial-tip">Touch the box with the correct answer</h4>
            <h4 className="tutorial-tip">If your answer is wrong, you will see it in red</h4>
            <h4 className="tutorial-tip">The correct answer will be shown in green</h4>
            <h4 className="tutorial-tip">Good luck!</h4>
            <button className="btn btn-primary" onClick={this.handleExit} >Exit Tutorial</button>
          </div>
          {
            endOfTutorial ? <h5 className="tutorial-end">Nice job! Click EXIT to return to the main page and start playing!</h5> : null
          }
        </div>

      </div>
    </div>
    )
  }
}

const mapState = state => ({
  questions: state.questions,
  currentQuestion: state.currentQuestion
})

const mapDispatch = dispatch => ({
  fetchTutorialQuestions: () => dispatch(getTutorialQuestions()),
  setInitialQuestion: (question) => dispatch(setQuestion(question)),
  clearCurrentQuestion: () => dispatch(setQuestion({text: '', choices: [], userGuess: null})),
  clearQuestions: () => dispatch(deleteQuestions()),
  resetScore: () => dispatch(updateScore(0))
})

export default connect(mapState, mapDispatch)(TutorialMode)

// PROP TYPES
TutorialMode.propTypes = {
  questions: PropTypes.array,
  currentQuestion: PropTypes.object,
  fetchTutorialQuestions: PropTypes.func,
  setInitialQuestion: PropTypes.func,
  clearCurrentQuestion: PropTypes.func,
  clearQuestions: PropTypes.func,
  resetScore: PropTypes.func
}

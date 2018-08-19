import React, {Component} from 'react'
import {connect} from 'react-redux'
import { getTutorialQuestions, deleteQuestions } from '../store/questions'
import { setQuestion } from '../store/currentQuestion'
import { updateScore } from '../store/score'
import { CameraCanvas } from './index'

// tutorial component must use webcam and canvas...
// how to use diffy though?
// do we need a special tutorial sidebar?
// make sure we reset everything at the end of the 'game'...
// have a button in the tutorial sidebar for 'go home'?


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
    console.log('handling exit')
    const { history, clearCurrentQuestion, clearQuestions, resetScore } = this.props
    clearCurrentQuestion()
    clearQuestions()
    resetScore()
    history.push('/')
  }

  render() {
    const { questions, currentQuestion } = this.props
    const endOfTutorial = (questions.indexOf(currentQuestion.question) === questions.length - 1) && (currentQuestion.userGuess !== null)

    return (
    <div className="tutorial game-wrapper">
      <CameraCanvas questions={questions} />
      <div className="container" id="tutorial-sidebar">
        <h3>TUTORIAL:</h3>
        <h4>Touch the box with the correct answer</h4>
        <h4>If your answer is wrong, you will see it in red</h4>
        <h4>The correct answer will be shown in green</h4>
        <h4>Good luck!</h4>
        <button onClick={this.handleExit} >Exit Tutorial</button>
        {
          endOfTutorial ? <h5>You have completed this tutorial. Click the exit button to return to the main page and start playing!</h5> : null
        }
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
  clearCurrentQuestion: () => dispatch(setQuestion({})),
  clearQuestions: () => dispatch(deleteQuestions()),
  resetScore: () => dispatch(updateScore(0))
})

export default connect(mapState, mapDispatch)(TutorialMode)

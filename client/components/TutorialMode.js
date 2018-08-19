import React, {Component} from 'react'
import {connect} from 'react-redux'
import { getTutorialQuestions } from '../store/questions'
import { setQuestion } from '../store/currentQuestion'
import { CameraCanvas } from './index'

// tutorial component must use webcam and canvas...
// how to use diffy though?
// do we need a special tutorial sidebar?
// make sure we reset everything at the end of the 'game'...
// have a button in the tutorial sidebar for 'go home'?


class TutorialMode extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const { fetchTutorialQuestions } = this.props
    fetchTutorialQuestions()
  }

  componentDidUpdate(prevProps) {
    // we want to know somehow if we have finished the tutorial...
    // setCurrentQuestion needs to be called here once we have questions...
    if (prevProps.questions !== this.props.questions) {
      const { setInitialQuestion, questions } = this.props
      setInitialQuestion(questions[0])
    }
  }

  render() {
    const { questions, currentQuestion } = this.props
    const endOfTutorial = (questions.indexOf(currentQuestion.question) === questions.length - 1) && (currentQuestion.userGuess !== null)

    console.log('endOfTutorial', endOfTutorial)

    return (
    <div className="tutorial game-wrapper">
      <CameraCanvas questions={questions} />
      <div className="container" id="tutorial-sidebar">
        <h3>TUTORIAL:</h3>
        {
          endOfTutorial ? <h4>You have completed this tutorial. Click the exit button to return to the main page</h4> : null
        }
        <button>Exit Tutorial</button>
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
  setInitialQuestion: (question) => dispatch(setQuestion(question))
})

export default connect(mapState, mapDispatch)(TutorialMode)

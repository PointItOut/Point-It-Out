import React, { Component } from 'react'
import { Stage, Layer, Rect, Text, Circle } from 'react-konva'
import Konva from 'konva'
import Webcam from 'react-webcam'
import Diffy from './diffy'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { submitAnswer, setQuestion } from '../store/currentQuestion'
import { updateScore } from '../store/score'

class CameraCanvas extends Component {
  constructor() {
    super()
    this.state = { loaded: false }
    this.nextQuestion = this.nextQuestion.bind(this)
  }

  componentDidMount() {
    // log stage react wrapper
    console.log(this.stageRef)
    // log Konva.Stage instance
    console.log(this.stageRef.getStage())

    const { setNewQuestion, questions, submitUserGuess } = this.props
    setNewQuestion(questions[0]) // start with first question
    submitUserGuess(null) // to reset userguess to null
    this.setState({
      loaded: true
    })
  }

  componentDidUpdate(prevProps) {
    const { currentQuestion } = this.props
    const question = currentQuestion.question
    const options = question ? question.choices : []
    if (
      currentQuestion.userGuess !== prevProps.currentQuestion.userGuess &&
      this.props.currentQuestion !== null
    ) {
      const wasGuessCorrect = options[currentQuestion.userGuess]
        ? options[currentQuestion.userGuess].isCorrect
        : false
      this.nextQuestion(wasGuessCorrect)
    }
  }

  nextQuestion(wasCorrect) {
    const {
      setNewQuestion,
      questions,
      currentQuestion,
      submitUserGuess,
      updateUserScore,
      score
    } = this.props
    const question = questions.find(
      (ques, index) => questions[index - 1] === currentQuestion.question
    )

    if (wasCorrect) {
      if (this.props.location.pathname.includes('solo')) {
        updateUserScore(score + 1, false)
      } else {
        const gameName = this.props.match.params.name
        updateUserScore(score + 1, true, this.props.user.userName, gameName)
      }
    }

    if (question && currentQuestion.userGuess !== null) {
      setTimeout(() => {
        submitUserGuess(null) // reset userGuess for next question
        setNewQuestion(question) // increment question
      }, 1000)
    }
  }

  render() {
    const { currentQuestion } = this.props
    const question = currentQuestion.question
    const options = question ? question.choices : undefined
    const xPositions = [0, 266, 533, 799]

    return (
      <div id="video-container">
        <Diffy />
        <Webcam />
        <Stage
          ref={ref => {
            this.stageRef = ref
          }}
          width={1000}
          height={750}
        >
          <Layer>
            <Rect
              x={0}
              y={10}
              width={200}
              height={75}
              fill={'purple'}
              opacity={0.5}
            />
            <Rect
              x={266}
              y={10}
              width={200}
              height={75}
              fill={'green'}
              opacity={0.5}
            />
            <Rect
              x={533}
              y={10}
              width={200}
              height={75}
              fill={'yellow'}
              opacity={0.5}
            />
            <Rect
              x={799}
              y={10}
              width={200}
              height={75}
              fill={'red'}
              opacity={0.5}
            />

            {// option text boxes
              options &&
              options.map((option, index) => {
                return (
                  <Text
                    key={option.id}
                    text={option.theChoice}
                    x={xPositions[index]}
                    y={20}
                    fontSize={20}
                    width={200}
                    align={'center'}
                    fill={'black'}
                  />
                )
              })}

            {// if we have options and the user has guessed, show feedback:
              currentQuestion.userGuess !== null && options
                ? options.map((option, index) => {
                  if (currentQuestion.userGuess === index) {
                    if (option.isCorrect) {
                      // they got it right! add green border
                      return (
                        <Rect
                          x={xPositions[index]}
                          y={10}
                          width={200}
                          height={75}
                          stroke={'green'}
                          strokeWidth={10}
                        />
                      )
                    } else {
                      // they got it wrong! add red border
                      return (
                        <Rect
                          x={xPositions[index]}
                          y={10}
                          width={200}
                          height={75}
                          stroke={'red'}
                          strokeWidth={10}
                        />
                      )
                    }
                  } else if (option.isCorrect) {
                    return (
                      <Rect
                        x={xPositions[index]}
                        y={10}
                        width={200}
                        height={75}
                        stroke={'green'}
                        strokeWidth={10}
                      />
                    )
                  } else {
                    return null
                  }
                })
                : null}

            <Rect
              x={200}
              y={680}
              width={600}
              height={75}
              fill={'blue'}
              opacity={0.5}
            />

            <Text
              text={question ? question.theQuestion : ''}
              x={250}
              y={700}
              fontSize={20}
              fill={'black'}
              align={'center'}
              width={500}
            />
          </Layer>
        </Stage>
      </div>
    )
  }
}

const mapState = state => ({
  currentQuestion: state.currentQuestion,
  score: state.score,
  user: state.user
})

const mapDispatch = dispatch => ({
  submitUserGuess: guess => dispatch(submitAnswer(guess)),
  setNewQuestion: question => dispatch(setQuestion(question)),
  updateUserScore: (score, partner, username, gameName) => dispatch(updateScore(score, partner, username, gameName))
})

export default withRouter(connect(mapState, mapDispatch)(CameraCanvas))

import React, { Component } from 'react'
import { render } from 'react-dom'
import { Stage, Layer, Rect, Text, Circle } from 'react-konva'
import Konva from 'konva'
import Webcam from 'react-webcam'
import Diffy from './diffy'

import { connect } from 'react-redux'
import { submitAnswer, setCurrentQuestion } from '../store/CurrentQuestion'
import { updateScore } from '../store/score';

class CameraCanvas extends React.Component {
  constructor() {
    super()
    this.state = {
      loaded: false
    }
    this.nextQuestion = this.nextQuestion.bind(this)
  }

  componentDidMount() {
    // log stage react wrapper
    console.log(this.stageRef)
    // log Konva.Stage instance
    console.log(this.stageRef.getStage())

    const { setQuestion, questions, submitUserGuess } = this.props
    setQuestion(questions[0])
    submitUserGuess(null) // to reset userguess to null
    this.setState({
      loaded: true
    })
  }

  componentDidUpdate(prevProps) {
    const { currentQuestion } = this.props
    const question = currentQuestion.question
    const options = question ? question.choices : []
    if (currentQuestion.userGuess !== prevProps.currentQuestion.userGuess && this.props.currentQuestion !== null) {
      // we just recorded a guess!
      const wasGuessCorrect = options[currentQuestion.userGuess] ? options[currentQuestion.userGuess].isCorrect : false
      this.nextQuestion(wasGuessCorrect)
    }
  }

  nextQuestion(wasCorrect) {
    const { setQuestion, questions, currentQuestion, submitUserGuess, updateUserScore, score } = this.props
    const question = questions.find((ques, index) => questions[index-1] === currentQuestion.question)

    if (wasCorrect) {
      updateUserScore(score.total + 1)
    }

    if (question && currentQuestion.userGuess !== null) {
      setTimeout(() => {
        submitUserGuess(null)
        setQuestion(question)
      }, 1000)
    }
  }



  render() {
    const { currentQuestion } = this.props
    const question = currentQuestion.question
    const options = question ? question.choices : undefined
    const xPositions = [0, 266, 533, 799]

    return (
      <div className="video-container">
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
            <Rect x={0} y={10} width={200} height={75} fill={'purple'} opacity={0.5} />
            <Rect x={266} y={10} width={200} height={75} fill={'green'} opacity={0.5} />
            <Rect x={533} y={10} width={200} height={75} fill={'yellow'} opacity={0.5} />
            <Rect x={799} y={10} width={200} height={75} fill={'red'} opacity={0.5} />


            {
              // option text boxes
              options && options.map((option, index) => {
                return (
                  <Text
                    key={option.id}
                    text={option.theChoice}
                    x={xPositions[index]}
                    y={20}
                    fontSize={20}
                    width={200}
                    align={"center"}
                    fill={'black'}
                  />)
              })
            }

            {
              options && options.map((option, index) => {
                if (currentQuestion.userGuess === index) {
                  if (option.isCorrect) {
                    // they got it right! add green border
                    return <Rect x={xPositions[index]} y={10} width={200} height={75} stroke={'green'} strokeWidth={10} />

                  } else {
                    // they got it wrong! add red border
                    return <Rect x={xPositions[index]} y={10} width={200} height={75} stroke={'red'} strokeWidth={10} />
                  }
                } else {
                  return null
                }
              })
            }

            <Text
              text={question ? question.theQuestion : ''}
              x={266}
              y={700}
              fontSize={20}
              fill={'black'}
              align={"center"}
              width={333}
            />

          </Layer>
        </Stage>
      </div>
    )
  }
}

const mapState = state => ({
  currentQuestion: state.currentQuestion,
  score: state.score
})

const mapDispatch = dispatch => ({
  submitUserGuess: guess => dispatch(submitAnswer(guess)),
  setQuestion: question => dispatch(setCurrentQuestion(question)),
  updateUserScore: score => dispatch(updateScore(score))
})

export default connect(mapState, mapDispatch)(CameraCanvas)

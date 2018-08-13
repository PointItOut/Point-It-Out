import React, { Component } from 'react'
import { render } from 'react-dom'
import { Stage, Layer, Rect, Text, Circle } from 'react-konva'
import Konva from 'konva'
import Webcam from 'react-webcam'
import Diffy from './diffy'

import { connect } from 'react-redux'
import { submitAnswer, setCurrentQuestion } from '../store/CurrentQuestion'

class CameraCanvas extends React.Component {
  componentDidMount() {
    // log stage react wrapper
    console.log(this.stageRef)
    // log Konva.Stage instance
    console.log(this.stageRef.getStage())

    // set first currentQuestion
    // we get questions passed as a prop from the parent
    const { setQuestion, questions, submitUserGuess } = this.props
    setQuestion(questions[0])
    submitUserGuess('')
  }




  render() {
    const { currentQuestion } = this.props
    const question = currentQuestion.question
    const options = question.choices

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
                    return (
                      <Rect x={xPositions[index]} y={10} width={200} height={75} stroke={'green'} strokeWidth={10} />
                    )
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
              text={question.theQuestion}
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
  currentQuestion: state.currentQuestion
})

const mapDispatch = dispatch => ({
  submitUserGuess: guess => dispatch(submitAnswer(guess)),
  setQuestion: question => dispatch(setCurrentQuestion(question))
})

export default connect(mapState, mapDispatch)(CameraCanvas)

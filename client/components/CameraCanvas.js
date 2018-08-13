import React, {Component} from 'react'
import {render} from 'react-dom'
import {Stage, Layer, Rect, Text, Circle} from 'react-konva'
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
    const { setQuestion, questions } = this.props
    setQuestion(questions[0])
  }

  render() {
    console.log('INSIDE THE CANVAS', this.props.questions)
    const {currentQuestion} = this.props
    const question = currentQuestion.question
    const options = question.choices
    console.log('OPTIONSSSS===>', options)
    // console.log(Diffy)

    const xPositions = [0, 266, 533, 799]

    if (options && currentQuestion.userGuess !== '') {
      const selectedAnswer = options[+question.userGuess]
      console.log('You guessed', selectedAnswer)
      if (selectedAnswer && selectedAnswer.isCorrect) {
        return <div>You got it correct!</div>
      } else {
        return <div>YOU'RE WRONG!!!</div>
      }
    }

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
            <Rect x={0} y={0} width={200} height={75} fill={'purple'} />
            <Rect x={266} y={0} width={200} height={75} fill={'green'} />
            <Rect x={533} y={0} width={200} height={75} fill={'yellow'} />
            <Rect x={799} y={0} width={200} height={75} fill={'red'} />


            {
              // option text boxes
              options && options.map((option, index) => {
              return (
                <Text
                  key={option.id}
                  text={option.theChoice}
                  x={xPositions[index]}
                  y={10}
                  fontSize={20}
                  width={200}
                  align={"center"}
                  fill={'black'}
                />)
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
  // submitUserGuess: guess => dispatch(submitAnswer())
  setQuestion: question => dispatch(setCurrentQuestion(question))
})

export default connect(mapState, mapDispatch)(CameraCanvas)

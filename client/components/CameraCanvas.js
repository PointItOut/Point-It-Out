import React, {Component} from 'react'
import {Stage, Layer, Rect, Text, Circle, Image} from 'react-konva'
import Konva from 'konva'
import Webcam from 'react-webcam'
import Diffy from './diffy'
import {withRouter} from 'react-router-dom'
import {PurpleRect, GreenRect, YellowRect, RedRect} from './canvas-rects'
import {connect} from 'react-redux'
import {submitAnswer, setQuestion} from '../store/currentQuestion'
import {updateScore} from '../store/score'

class CameraCanvas extends Component {
  constructor() {
    super()
    this.state = {loaded: false}
    this.nextQuestion = this.nextQuestion.bind(this)
  }

  componentDidMount() {
    // log stage react wrapper
    console.log(this.stageRef)
    // log Konva.Stage instance
    console.log(this.stageRef.getStage())

    const {setNewQuestion, questions, submitUserGuess} = this.props

    setNewQuestion(questions[0]) // start with first question
    submitUserGuess(null) // to reset userguess to null
    this.setState({
      loaded: true
    })
  }

  componentDidUpdate(prevProps) {
    const {currentQuestion} = this.props
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
        console.log('question', currentQuestion)
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
    const opponent = this.props.opponent
    const opponentNames = Object.keys(opponent).sort((name1, name2) => {
      const score1 = opponent[name1]
      const score2 = opponent[name2]
      if (score1 < score2) {
        return 1
      } else if (score1 > score2) {
        return -1
      } else {
        return 0
      }
    })

    const scores = Object.values(opponent)
    const maxscore = Math.max(...scores)
    const winner = opponentNames.filter(name => opponent[name] === maxscore)
    let chkwinner = false
    if (winner.length === 1) {
      chkwinner = true
    }
    const pathname = this.props.location.pathname

    const {currentQuestion} = this.props
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
            <PurpleRect />
            <GreenRect />
            <YellowRect />
            <RedRect />
            {this.props.timeover && chkwinner && !pathname.includes('solo') ? (
              <Text
                text={`The winner is ${winner[0]}
                `}
                x={250}
                y={280}
                fontSize={50}
                fill={'blue'}
                align={'center'}
                width={500}
              />
            ) : null}

            {this.props.timeover && !chkwinner && !pathname.includes('solo') ? (
              <Text
                text={`It's a draw`}
                x={250}
                y={280}
                fontSize={50}
                fill={'blue'}
                align={'center'}
                width={400}
              />
            ) : null}

            {this.props.timeover && !pathname.includes('solo')
              ? opponentNames.map((name, index) => {
                  return (
                    <Text
                      text={`${name}: ${opponent[name]}`}
                      x={250}
                      y={350 + index * 50}
                      fontSize={50}
                      fill={'blue'}
                      align={'center'}
                      width={300}
                    />
                  )
                })
              : null}

            {// option images
            options &&
              options.map((option, index) => {
                if (option.picture) {
                  const imageObj = new window.Image()
                  imageObj.onload = () => {}
                  imageObj.src = option.picture
                  return (
                    <Image
                      x={xPositions[index]}
                      y={85}
                      image={imageObj}
                      width="200"
                      ref={ref => {
                        this.stageRef = ref
                      }}
                    />
                  )
                } else {
                  return null
                }
              })}

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
              fill={'white'}
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
  user: state.user,
  opponent: state.opponent,
  timeover: state.game.timeover
})

const mapDispatch = dispatch => ({
  submitUserGuess: guess => dispatch(submitAnswer(guess)),
  setNewQuestion: question => dispatch(setQuestion(question)),
  updateUserScore: (score, partner, username, gameName) =>
    dispatch(updateScore(score, partner, username, gameName))
})

export default withRouter(connect(mapState, mapDispatch)(CameraCanvas))

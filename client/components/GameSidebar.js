import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Countdown from 'react-countdown-now'
import AddConfetti from './AddConfetti'
import { Scoreboard, Opentok } from './index'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setTimeOver, startGame, deleteGame } from '../store/game'
import socket from '../socket'
import { setHighScore, updateScore } from '../store/score'
import FaceRecognition from './FaceRecognition'
import soundsObject from '../sounds'

class GameSidebar extends Component {
  constructor() {
    super()
    this.handleScores = this.handleScores.bind(this)
    this.state = { timer: Date.now() + 10000 }
  }

  handleScores(score) {
    soundsObject.applause.play()
    const {
      user,
      currentCategory,
      isSolo,
      setHighScore,
      setTimeOver
    } = this.props
    // current is category, but where does that come from...
    setTimeOver(true)
    if (isSolo) {
      setHighScore(score, currentCategory, user)
    } else {
      setHighScore(score, undefined, user)
    }
  }

  componentWillUnmount() {
    soundsObject.applause.stop()
  }

  render() {
    const renderer = ({ minutes, seconds, completed }) => {
      if (completed) {
        return (
          <div>
            <FaceRecognition />
            <AddConfetti />
          </div>
        )
      } else {
        return (
          <div className="card">
            <div className="card-header blue-header">
              <h4>TIME REMAINING</h4>
            </div>
            <div>
              <span className="clock text-center">
                {minutes}:{seconds}
              </span>
            </div>
          </div>
        )
      }
    }

    const {
      token,
      currentgame,
      startGame,
      deleteGame,
      score,
      isSolo,
      user
    } = this.props
    const Mode = 'partner'

    return (
      <div id="game-sidebar" className="container">
        {startGame || isSolo ? (
          <div>
            <Countdown
              date={this.state.timer}
              renderer={renderer}
              onComplete={() => {
                this.handleScores(score)
              }}
            />
            <Scoreboard isSolo={isSolo} />
          </div>
        ) : null}

        {!this.props.isSolo ? (
          <Opentok currentgame={currentgame} token={token} />
        ) : (
            <div>
              <button
                type="button"
                className="btn btn-main"
                onClick={() => {
                  this.props.updateSoloScore(0)
                  this.props.history.push('/home')
                }}
              >
                Exit
            </button>
              <button
                type="button"
                className="btn btn-main"
                onClick={() => this.props.restartGame()}
              >
                Play Again
            </button>
            </div>
          )}
        {startGame && user.host && !isSolo ? (
          <div>
            <button
              className="btn btn-main"
              type="button"
              onClick={() => {
                deleteGame(currentgame.name, Mode)
              }}
            >
              Exit
            </button>

            <button
              type="button"
              className="btn btn-main"
              onClick={() => socket.emit('rematch', { currentgame })}
            >
              Rematch
            </button>
          </div>
        ) : null}

        {!user.host && !isSolo ? (
          <button
            type="button"
            className="btn btn-main"
            onClick={() => {
              this.props.history.push('/home')
            }}
          >
            Exit
          </button>
        ) : null}
      </div>
    )
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    deleteGame: (gamename, mode) => dispatch(deleteGame(gamename, mode)),
    setTimeOver: logic => dispatch(setTimeOver(logic)),
    setHighScore: (score, category, user) =>
      dispatch(setHighScore(score, category, user)),
    restartGame: () => {
      dispatch(startGame())
      dispatch(updateScore(0))
    },
    updateSoloScore: (num) => dispatch(updateScore(num))
  }
}

const mapState = state => ({
  user: state.user,
  score: state.score,
  currentCategory: state.categories.current
})

export default withRouter(connect(mapState, mapDispatchToProps)(GameSidebar))

GameSidebar.propTypes = {
  user: PropTypes.object,
  score: PropTypes.number,
  currentCategory: PropTypes.object,
  deleteGame: PropTypes.func,
  setTimeOver: PropTypes.func,
  setHighScore: PropTypes.func,
  restartGame: PropTypes.func,
  currentgame: PropTypes.object,
  isSolo: PropTypes.bool,
  token: PropTypes.string,
  startGame: PropTypes.bool
}

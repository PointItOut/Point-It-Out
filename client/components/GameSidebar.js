import React, {Component} from 'react'
import Countdown from 'react-countdown-now'
import AddConfetti from './AddConfetti'
import {Scoreboard, Opentok} from './index'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {setTimeOver, startGame, deleteGame} from '../store/game'
import socket from '../socket'
import {setHighScore, updateScore} from '../store/score'

class GameSidebar extends Component {
  constructor() {
    super()
    this.handleScores = this.handleScores.bind(this)
    this.state = {timer: Date.now() + 60000}
  }

  handleScores(score) {
    const current = this.props.current
    this.props.setTimeOver(true)
    if (this.props.isSolo) {
      this.props.setHighScore(score, current)
    } else {
      this.props.setHighScore(score)
    }
  }

  render() {
    const renderer = ({minutes, seconds, completed}) => {
      if (completed) {
        return (
          <div>
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

    const token = this.props.token
    const currentgame = this.props.currentgame
    const startGame = this.props.startGame
    const deleteGame = this.props.deleteGame
    const Mode = 'partner'
    const score = this.props.score

    return (
      <div id="game-sidebar" className="container">
        {startGame || this.props.isSolo ? (
          <div>
            <Countdown
              date={this.state.timer}
              renderer={renderer}
              onComplete={() => {
                this.handleScores(score)
              }}
            />
            <Scoreboard isSolo={this.props.isSolo} />
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
        {startGame && this.props.user.host && !this.props.isSolo ? (
          <div>
            <button
              className="btn btn-primary"
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
              onClick={() => socket.emit('rematch', {currentgame})}
            >
              Rematch
            </button>
          </div>
        ) : null}
      </div>
    )
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    deleteGame: (gamename, mode) => dispatch(deleteGame(gamename, mode)),
    setTimeOver: logic => dispatch(setTimeOver(logic)),
    setHighScore: (score, category) => dispatch(setHighScore(score, category)),
    restartGame: () => {
      dispatch(startGame())
      dispatch(updateScore(0))
    }
  }
}

const mapState = state => ({
  user: state.user,
  score: state.score,
  current: state.categories.current
})

export default withRouter(connect(mapState, mapDispatchToProps)(GameSidebar))

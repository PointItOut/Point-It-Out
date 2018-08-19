import React, {Component} from 'react'
import Countdown from 'react-countdown-now'
import AddConfetti from './AddConfetti'
import {Scoreboard, Opentok} from './index'
import {connect} from 'react-redux'
import {deleteGame} from '../store/game'
import {withRouter} from 'react-router-dom'
import {setTimeOver} from '../store/game'
import {setHighScore} from '../store/score'

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
          <div>
            Your Opponents<Opentok currentgame={currentgame} token={token} />
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-main"
            onClick={() => {
              this.props.history.push('/home')
            }}
          >
            Exit
          </button>
        )}
        {startGame && this.props.user.host ? (
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              deleteGame(currentgame.name, Mode)
            }}
          >
            Exit
          </button>
        ) : null}
      </div>
    )
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    deleteGame: (gamename, mode) => dispatch(deleteGame(gamename, mode)),
    setTimeOver: logic => dispatch(setTimeOver(logic)),
    setHighScore: (score, category) => dispatch(setHighScore(score, category))
  }
}

const mapState = state => ({
  user: state.user,
  score: state.score,
  current: state.categories.current
})

export default withRouter(connect(mapState, mapDispatchToProps)(GameSidebar))

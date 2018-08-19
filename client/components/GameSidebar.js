import React from 'react'
import Countdown from 'react-countdown-now'
import AddConfetti from './AddConfetti'
import {Scoreboard, Opentok} from './index'
import {connect} from 'react-redux'
import {deleteGame} from '../store/game'
import {withRouter} from 'react-router-dom'
import {setTimeOver, startGame} from '../store/game'

const GameSidebar = props => {
  const dispatchsetTimeOver = props.setTimeOver

  const renderer = ({minutes, seconds, completed}) => {
    if (completed) {
      dispatchsetTimeOver(true)
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
  const token = props.token
  const currentgame = props.currentgame
  const startGame = props.startGame
  const deleteGame = props.deleteGame
  const Mode = 'partner'
  console.log('SOLOSOLOSOLOSOLO>>>>>>>', props.isSolo)
  return (
    <div id="game-sidebar" className="container">
      {startGame || props.isSolo ? (
        <div>
          <Countdown date={Date.now() + 10000} renderer={renderer} />
          <Scoreboard isSolo={props.isSolo} />
        </div>
      ) : null}

      {!props.isSolo ? (
        <Opentok currentgame={currentgame} token={token} />
      ) : (
        <div>
          <button
            type="button"
            className="btn btn-main"
            onClick={() => {
              props.history.push('/home')
            }}
          >
            Exit
          </button>

          <button
            type="button"
            className="btn btn-main"
            onClick={() => props.restartGame()}
          >
            Play Again
          </button>
        </div>
      )}
      {startGame && props.user.host && !props.isSolo ? (
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

          <button type="button" className="btn btn-main">
            Rematch
          </button>
        </div>
      ) : null}
    </div>
  )
}

const mapDispatchToProps = function(dispatch) {
  return {
    deleteGame: (gamename, mode) => dispatch(deleteGame(gamename, mode)),
    setTimeOver: logic => dispatch(setTimeOver(logic)),
    restartGame: () => dispatch(startGame(true))
  }
}

const mapState = state => ({
  user: state.user
})

export default withRouter(connect(mapState, mapDispatchToProps)(GameSidebar))

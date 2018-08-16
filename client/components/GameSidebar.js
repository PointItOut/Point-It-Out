import React from 'react'
import Countdown from 'react-countdown-now';
import AddConfetti from './AddConfetti'
import { Scoreboard, Opentok } from './index'
import { withRouter } from 'react-router-dom'


const GameSidebar = props => {
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <AddConfetti />
    } else {
      return <span className='clock'>{minutes}:{seconds}</span>;
    }
  }
  const token = props.token
  const currentgame = props.currentgame
  const startGame = props.startGame
  return (
    <div id="game-sidebar">
      {startGame || props.isSolo ? <div><Countdown date={Date.now() + 60000} renderer={renderer} /> <Scoreboard isSolo={props.isSolo} /> </div> : null}

      {!props.isSolo ? (
        <Opentok currentgame={currentgame} token={token} />
      ) : null}
    </div>
  )
}

export default GameSidebar

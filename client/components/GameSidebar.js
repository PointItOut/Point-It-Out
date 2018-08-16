import React from 'react'
import Countdown from 'react-countdown-now';
import AddConfetti from './AddConfetti'
import { Scoreboard, Opentok } from './index'

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
      < Countdown date={Date.now() + 60000} renderer={renderer} />
      {startGame || props.isSolo ? <Scoreboard isSolo={props.isSolo} /> : null}

      {!props.isSolo ? (
        <Opentok currentgame={currentgame} token={token} />
      ) : null}
    </div>
  )
}

export default GameSidebar

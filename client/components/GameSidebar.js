import React from 'react'
import { Scoreboard } from './index'
import Countdown from 'react-countdown-now';
import AddConfetti from './AddConfetti'


const GameSidebar = () => {
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <AddConfetti />
    } else {
      return <span className='clock'>{minutes}:{seconds}</span>;
    }
  }
  return (
    <div id="game-sidebar">
      < Countdown date={Date.now() + 60000} renderer={renderer} />
      <Scoreboard />
    </div>
  )
}

export default GameSidebar

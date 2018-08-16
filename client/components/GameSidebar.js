import React from 'react'
import {Scoreboard, Opentok} from './index'

const GameSidebar = props => {
  const token = props.token
  const currentgame = props.currentgame
  const startGame = props.startGame
  return (
    <div id="game-sidebar">
      {startGame || props.isSolo ? <Scoreboard isSolo={props.isSolo} /> : null}

      {!props.isSolo ? (
        <Opentok currentgame={currentgame} token={token} />
      ) : null}
    </div>
  )
}

export default GameSidebar

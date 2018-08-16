import React from 'react'
import {Scoreboard, Opentok} from './index'

const GameSidebar = props => {
  const token = props.token
  const currentgame = props.currentgame
  const startGame = props.startGame
  return (
    <div id="game-sidebar">
      {/* we will add styling so it is positioned to the right of the webcame */}
      {startGame || props.isSolo ? <Scoreboard isSolo={props.isSolo} /> : null}

      {/* <Scoreboard /> */}
      {!props.isSolo ? (
        <Opentok currentgame={currentgame} token={token} />
      ) : null}
    </div>
  )
}

export default GameSidebar

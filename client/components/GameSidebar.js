import React from 'react'
import {Scoreboard, Opentok} from './index'

const GameSidebar = props => {
  const token = props.token
  const currentgame = props.currentgame
  const startGame = props.startGame
  return (
    <div id="game-sidebar">
      {/* we will add styling so it is positioned to the right of the webcame */}
      {startGame ? <Scoreboard /> : null}

      {/* <Scoreboard /> */}
      <Opentok currentgame={currentgame} token={token} />
    </div>
  )
}

export default GameSidebar

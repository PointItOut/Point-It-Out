import React from 'react'
import { Scoreboard } from './index'

const GameSidebar = () => {
  return (
    <div id="game-sidebar">
    {/* we will add styling so it is positioned to the right of the webcame */}
      This is the game sidebar!
      <Scoreboard />
    </div>
  )
}

export default GameSidebar

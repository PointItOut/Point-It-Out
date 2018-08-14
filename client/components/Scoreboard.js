import React from 'react'
import {connect} from 'react-redux'

const Scoreboard = props => {
  const opponent = props.opponent
  const opponentNames = Object.keys(opponent)
  return (
    <div>
      <h3>Your score:</h3>
      <h3>{props.score}</h3>
      {opponentNames.forEach(name => {
        return (
          <div>
            <h3>{name}</h3>
            <h3>{opponent[name]}</h3>
          </div>
        )
      })}
    </div>
  )
}

const mapState = state => ({
  score: state.score,
  opponent: state.opponent
})

export default connect(mapState)(Scoreboard)

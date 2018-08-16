import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


const Scoreboard = props => {
  const opponent = props.opponent
  const opponentNames = Object.keys(opponent)
  return (
    <div>
      {props.location.pathname.includes('solo') ?
        <div>
          <h3>Your score:</h3>
          <h3>{props.score}</h3>
        </div>
        : (opponentNames.map(name => {
          return (
            <div>
              <h3>{name}</h3>
              <h3>{opponent[name]}</h3>
            </div>
          )
        }))
      }
    </div>
  )
}

const mapState = state => ({
  score: state.score,
  opponent: state.opponent
})

export default withRouter(connect(mapState)(Scoreboard))

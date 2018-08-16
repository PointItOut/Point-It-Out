import React from 'react'
<<<<<<< HEAD
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

=======
import {connect} from 'react-redux'
>>>>>>> master

const Scoreboard = props => {
  const opponent = props.opponent
  const opponentNames = Object.keys(opponent)
  console.log('CONSOLE LOG =>', props.isSolo)
  return (
    <div>
<<<<<<< HEAD
      {props.location.pathname.includes('solo') ?
=======
      <h3>Scoreboard</h3>
      {props.isSolo ? (
>>>>>>> master
        <div>
          <h3>Your score:</h3>
          <h3>{props.score}</h3>
        </div>
<<<<<<< HEAD
        : (opponentNames.map(name => {
          return (
            <div>
              <h3>{name}</h3>
              <h3>{opponent[name]}</h3>
            </div>
          )
        }))
      }
=======
      ) : (
        <div>
          {opponentNames.map(name => {
            return (
              <div>
                <h3>{name}</h3>
                <h3>{opponent[name]}</h3>
              </div>
            )
          })}
        </div>
      )}
>>>>>>> master
    </div>
  )
}

const mapState = state => ({
  score: state.score,
  opponent: state.opponent
})

export default withRouter(connect(mapState)(Scoreboard))

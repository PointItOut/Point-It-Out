import React from 'react'
import {connect} from 'react-redux'

const Scoreboard = props => {
  const opponent = props.opponent
  const opponentNames = Object.keys(opponent)
  console.log('CONSOLE LOG =>', props.isSolo)
  return (
    <div className="card">
      <div className="card-header blue-header">
        <h4>SCOREBOARD</h4>
      </div>
      <div className="card-body">
        {props.isSolo ? (
          <div className="scoreboard">
            <h4>YOU</h4>
            <h4 className="score">{props.score}</h4>
          </div>
        ) : (
          <div className="row">
            {opponentNames.map(name => {
              return (
                <div className="scoreboard col-sm-12 col-md-6">
                  <h4>{name.toUpperCase()}</h4>
                  <h4 className="score">{opponent[name]}</h4>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

const mapState = state => ({
  score: state.score,
  opponent: state.opponent
})

export default connect(mapState)(Scoreboard)

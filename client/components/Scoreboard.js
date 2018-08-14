import React from 'react'
import { connect } from 'react-redux'

const Scoreboard = props => {
  return (
    <div>
      <h3>Your score:</h3>
      <h3>{props.score}</h3>
      {/* for when there is an opponent, we will add it to our mapState and also display the opponent's score in the JSX */}
    </div>
  )
}

const mapState = state => ({
  score: state.score
})

export default connect(mapState)(Scoreboard)

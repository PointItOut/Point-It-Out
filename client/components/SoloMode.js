import React from 'react'
import {connect} from 'react-redux'
import {CameraCanvas, GameSidebar} from './index'
import Countdown from 'react-countdown-now'

const SoloMode = props => {
  const questions = props.questions

  const renderer = ({seconds, completed}) => {
    if (completed) {
      return (
        <div className="game-wrapper">
          <CameraCanvas questions={questions} />
          <GameSidebar isSolo={props.match.path === '/solo'} />
        </div>
      )
    } else {
      return <span className="clock">{seconds}</span>
    }
  }
  return (
    <div>
      <Countdown
        date={Date.now() + 3000}
        renderer={renderer}
        zeroPadLength={1}
      />
    </div>
  )
}

const mapState = state => {
  return {
    category: state.category,
    questions: state.questions
  }
}

export default connect(mapState)(SoloMode)

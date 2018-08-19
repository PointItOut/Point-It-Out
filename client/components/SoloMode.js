import React, {Component} from 'react'
import {connect} from 'react-redux'
import {CameraCanvas, GameSidebar} from './index'
import Countdown from 'react-countdown-now'
import {setTimeOver} from '../store/game'
import {withRouter} from 'react-router-dom'

class SoloMode extends Component {
  componentDidMount() {
    if (!this.props.startGame) {
      this.props.history.push('/home')
    }
  }
  render() {
    const questions = this.props.questions
    const timeover = this.props.timeover
    const renderer = ({seconds, completed}) => {
      if (completed) {
        return (
          <div className="game-wrapper">
            <CameraCanvas questions={questions} />
            <GameSidebar isSolo={this.props.match.path === '/solo'} />
          </div>
        )
      } else {
        return <span className="clock">{seconds}</span>
      }
    }

    return (
      <div>
        <Countdown
          //force componentDidmount(CDM) when this changes
          //Countdown does a setInterval only in CDM.
          key={this.props.gameCountdown}
          date={this.props.gameCountdown}
          renderer={renderer.bind(this)}
          zeroPadLength={1}
        />
      </div>
    )
  }
}

const mapState = state => {
  return {
    category: state.category,
    questions: state.questions,
    timeover: state.game.timeover,
    gameCountdown: state.game.gameCountdown,
    startGame: state.game.startGame
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    setTimeOver: logic => dispatch(setTimeOver(logic))
  }
}

export default withRouter(connect(mapState, mapDispatchToProps)(SoloMode))

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {CameraCanvas, GameSidebar} from './index'
import Countdown from 'react-countdown-now'
import {setTimeOver} from '../store/game'

class SoloMode extends Component {
  // async componentDidMount() {
  //   await this.props.setTimeOver(false)
  // }

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
      // (!timeover) ?
      <div>
        <Countdown
          date={this.props.gameCountdown}
          renderer={renderer.bind(this)}
          zeroPadLength={1}
        />
      </div>
      // :
      // <div className="game-wrapper" >
      //   <CameraCanvas questions={questions} />
      //   <GameSidebar isSolo={this.props.match.path === '/solo'} />
      // </div>
    )
  }
}

const mapState = state => {
  return {
    category: state.category,
    questions: state.questions,
    timeover: state.game.timeover,
    gameCountdown: state.game.gameCountdown
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    setTimeOver: logic => dispatch(setTimeOver(logic))
  }
}

export default connect(mapState, mapDispatchToProps)(SoloMode)

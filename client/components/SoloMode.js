import React from 'react'
import {connect} from 'react-redux'
import {CameraCanvas, GameSidebar} from './index'

const SoloMode = props => {
  const questions = props.questions
  console.log('>>>>', props.match.path === '/solo')
  return (
    <div className="game-wrapper">
      <CameraCanvas questions={questions} />
      <GameSidebar isSolo={props.match.path === '/solo'} />
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

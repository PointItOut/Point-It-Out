import { create } from 'diffyjs'
import React from 'react'
import socket from '../socket'
import { submitAnswerIndex } from '../store/currentQuestion'
import store from '../store'

const diffy = create({
  resolution: { x: 15, y: 10 },
  sensitivity: 0.2,
  threshold: 25,
  debug: false,
  containerClassName: 'my-diffy-container',
  sourceDimensions: { w: 130, h: 100 },
  onFrame: matrix => {
    const purple = [matrix[0][0], matrix[1][0], matrix[2][0]]
    const green = [matrix[4][0], matrix[5][0], matrix[6][0]]
    const yellow = [matrix[8][0], matrix[9][0], matrix[10][0]]
    const red = [matrix[12][0], matrix[13][0], matrix[14][0]]
    if ((store.getState().currentQuestion.text !== '') && (!store.getState().game.timeover) && (store.getState().currentQuestion.userGuess === null)) {
      if (purple.some(dot => dot < 200)) {
        store.dispatch(submitAnswerIndex(0))
      }
      if (green.some(dot => dot < 200)) {
        store.dispatch(submitAnswerIndex(1))
      }

      if (yellow.some(dot => dot < 200)) {
        store.dispatch(submitAnswerIndex(2))
      }

      if (red.some(dot => dot < 200)) {
        store.dispatch(submitAnswerIndex(3))
      }
    }
  }
})

class Diffy extends React.Component {
  render() {
    return <div />
  }
}

export default Diffy

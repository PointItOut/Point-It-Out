import {create} from 'diffyjs'
import React, {Component} from 'react'
import socket from '../socket'
import { publishAnswer, submitAnswer } from '../store/CurrentQuestion'
import store from '../store'

const diffy = create({
  resolution: {x: 15, y: 10},
  sensitivity: 0.2,
  threshold: 25,
  debug: false,
  containerClassName: 'my-diffy-container',
  sourceDimensions: {w: 130, h: 100},
  onFrame: matrix => {
    const purple = [matrix[0][0], matrix[1][0], matrix[2][0]]
    const green = [matrix[4][0], matrix[5][0], matrix[6][0]]
    const yellow = [matrix[8][0], matrix[9][0], matrix[10][0]]
    const red = [matrix[12][0], matrix[13][0], matrix[14][0]]
    if(store.getState().currentQuestion.question !== '') {
      if (purple.some(dot => dot < 200)) {
        socket.emit('purple', 'Someone else touched the purple rectangle!')
        console.log('You touched the purple rectangle!')
        store.dispatch(submitAnswer(0))
      }
      if (green.some(dot => dot < 200)) {
        console.log('You touched the green rectangle!')
        store.dispatch(submitAnswer(1))
      }

      if (yellow.some(dot => dot < 200)) {
        console.log('You touched the yellow rectangle!')
        store.dispatch(submitAnswer(2))
      }

      if (red.some(dot => dot < 200)) {
        console.log('You touched the red rectangle!')
        store.dispatch(submitAnswer(3))
      }
    }
  }
})

class Diffy extends React.Component {
  componentDidMount() {
    // const diffy = create({
    //   resolution: {x: 15, y: 10},
    //   sensitivity: 0.2,
    //   threshold: 25,
    //   debug: false,
    //   containerClassName: 'my-diffy-container',
    //   sourceDimensions: {w: 130, h: 100},
    //   onFrame: function(matrix) {
    //     const purple = [matrix[0][0], matrix[1][0], matrix[2][0]]
    //     const green = [matrix[4][0], matrix[5][0], matrix[6][0]]
    //     const yellow = [matrix[8][0], matrix[9][0], matrix[10][0]]
    //     const red = [matrix[12][0], matrix[13][0], matrix[14][0]]
    //     if (purple.some(dot => dot < 200)) {
    //       // socket.emit('purple', 'Someone else touched the purple rectangle!')
    //       console.log('You touched the purple rectangle!')
    //       store.dispatch(submitAnswer(0))
    //     }
    //     if (green.some(dot => dot < 200)) {
    //       console.log('You touched the green rectangle!')
    //       store.dispatch(submitAnswer(1))
    //     }

    //     if (yellow.some(dot => dot < 200)) {
    //       console.log('You touched the yellow rectangle!')
    //       store.dispatch(submitAnswer(2))
    //     }

    //     if (red.some(dot => dot < 200)) {
    //       console.log('You touched the red rectangle!')
    //       store.dispatch(submitAnswer(3))
    //     }
    //   }
    // })
    // window.diffy = diffy
    // console.log('** diffy', diffy)
  }

  render() {
    return <div />
  }
}


export default Diffy

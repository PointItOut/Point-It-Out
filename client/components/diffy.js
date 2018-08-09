import {create} from 'diffyjs'
import React, {Component} from 'react'

const diffy = create({
  resolution: {x: 15, y: 10},
  sensitivity: 0.2,
  threshold: 25,
  debug: true,
  containerClassName: 'my-diffy-container',
  sourceDimensions: {w: 130, h: 100},
  onFrame: matrix => {
    console.log(matrix)
  }
})
const myDiffy = props => {
  window.diffy = diffy
  return (
    <div>
      <h3>Diffy?</h3>
    </div>
  )
}
export default myDiffy

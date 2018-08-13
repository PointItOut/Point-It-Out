import React, { Component } from 'react'
import { render } from 'react-dom'
import { Stage, Layer, Rect, Text, Circle } from 'react-konva'
import Konva from 'konva'
import Webcam from 'react-webcam'
import Diffy from './diffy'

class CameraCanvas extends React.Component {

  render() {
    // console.log(Diffy)
    return (
      <div className="video-container">
        <Webcam />
        {/* <Diffy /> */}
        <Stage
          ref={ref => {
            this.stageRef = ref
          }}
          width={1000}
          height={750}
        >
          <Layer>
            <Text text="Try click on rect" />
            <Rect x={0} y={0} width={200} height={75} fill={'purple'} />
            <Rect x={266} y={0} width={200} height={75} fill={'green'} />
            <Rect x={533} y={0} width={200} height={75} fill={'yellow'} />
            <Rect x={799} y={0} width={200} height={75} fill={'red'} />
          </Layer>
        </Stage>
      </div>
    )
  }
}

export default CameraCanvas

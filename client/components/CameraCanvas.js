import React, {Component} from 'react'
import {render} from 'react-dom'
import {Stage, Layer, Rect, Text, Circle} from 'react-konva'
import Konva from 'konva'
import Webcam from 'react-webcam'
import Diffy from './diffy'

class CameraCanvas extends React.Component {
  componentDidMount() {
    // log stage react wrapper
    console.log(this.stageRef)
    // log Konva.Stage instance
    console.log(this.stageRef.getStage())
  }

  render() {
    console.log('INSIDE THE CANVAS', this.props.questions)
    const question = this.props.questions[0] // first question
    const options = question.choices
    console.log('OPTIONSSSS===>', options)
    // console.log(Diffy)

    const xPositions = [0, 266, 533, 799]

    return (
      <div className="video-container">
        <Webcam />
        <Stage
          ref={ref => {
            this.stageRef = ref
          }}
          width={1000}
          height={750}
        >
          <Layer>
            <Rect x={0} y={0} width={200} height={75} fill={'purple'} />
            <Rect x={266} y={0} width={200} height={75} fill={'green'} />
            <Rect x={533} y={0} width={200} height={75} fill={'yellow'} />
            <Rect x={799} y={0} width={200} height={75} fill={'red'} />


            {
              // option text boxes
              options.map((option, index) => {
              return (
                <Text
                  key={option.id}
                  text={option.theChoice}
                  x={xPositions[index]}
                  y={10}
                  fontSize={20}
                  width={200}
                  align={"center"}
                  fill={'black'}
                />)
              })

            }

            <Text
              text={question.theQuestion}
              x={266}
              y={700}
              fontSize={20}
              fill={'black'}
              align={"center"}
              width={333}
            />

          </Layer>
        </Stage>
      </div>
    )
  }
}

export default CameraCanvas

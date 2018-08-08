import React, { Component } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';
import Webcam from 'react-webcam';

class CameraCanvas extends React.Component {

    componentDidMount() {
        // log stage react wrapper
        console.log(this.stageRef);
        // log Konva.Stage instance
        console.log(this.stageRef.getStage());
    }


    render() {


        return (
            <div className="videoContainer">
                <Webcam />
                <Stage ref={ref => { this.stageRef = ref; }} width={1000} height={750}>
                    <Layer>
                        <Text text="Try click on rect" />
                        <Rect
                            x={0}
                            y={0}
                            width={50}
                            height={50}
                            fill={'black'}
                        />
                        <Rect
                            x={350}
                            y={250}
                            width={100}
                            height={100}
                            fill={'black'}
                        />
                    </Layer>
                </Stage>


            </div>

        )
    }

}

export default CameraCanvas






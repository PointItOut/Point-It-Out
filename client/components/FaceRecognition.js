
import React, { Component } from 'react'
import { setCoords } from '../store/facecoord'
import { connect } from 'react-redux'


class FaceRecognition extends Component {

    componentDidMount() {
        var video = document.getElementsByClassName('video')[1];
        var canvas = document.querySelector('.konvajs-content canvas');
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Not adding `{ audio: true }` since we only want video now
            navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
                video.src = window.URL.createObjectURL(stream);
            });
        }

        const ctracker = new clm.tracker({ faceDetection: { useWebWorkers: true } });

        ctracker.init();
        ctracker.start(video);
        console.log('==========>', this.props)
        const setCoords = this.props.setCoords


        function positionLoop() {
            const canvasWidth = canvas.scrollWidth;
            const canvasHeight = canvas.scrollHeight;
            requestAnimationFrame(positionLoop);
            var positions = ctracker.getCurrentPosition();
            if (positions) {
                const headWidth = canvasWidth * Math.abs(positions[14][0] - positions[0][0]) * 1.2 / 130
                const halfHeadHeight = canvasHeight * (Math.abs(positions[62][1] - positions[7][1]) / 100) * 0.6
                console.log('===============>', halfHeadHeight)
                const x = canvasWidth - canvasWidth * positions[14][0] / 130
                const y = (canvasHeight * Math.max(positions[20][1], positions[21][1], positions[17][1], positions[16][1]) / 100) - halfHeadHeight
                setCoords({ x, y, headWidth })
            }
        }
        positionLoop();
    }

    render() {
        return (
            <div>
            </div>
        )

    }
}

const mapDispatch = dispatch => ({
    setCoords: obj => dispatch(setCoords(obj))
})

export default connect(null, mapDispatch)(FaceRecognition)



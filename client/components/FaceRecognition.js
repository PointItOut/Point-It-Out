
import React, { Component } from 'react';
import { setCoords } from '../store/facecoord';
import { connect } from 'react-redux';


class FaceRecognition extends Component {

    constructor() {
        super();
        this.state = {
            ctracker: null,
            animationFrameId: null,
            trackingLoopEnabled: false,
            canvas: null
        };
        this.positionLoop = this.positionLoop.bind(this);
    }

    componentDidMount() {
        console.log('componentDidMount');
        var video = document.getElementsByClassName('video')[1];
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Not adding `{ audio: true }` since we only want video now
            navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
                video.src = window.URL.createObjectURL(stream);
            });
        }

        const ctracker = new clm.tracker({ faceDetection: { useWebWorkers: true } });
        ctracker.init();
        ctracker.start(video);

        this.setState({
            trackingLoopEnabled: true,
            ctracker,
            canvas: document.querySelector('.konvajs-content canvas')
        }, () => {
            this.positionLoop();
        });
    }

    positionLoop() {
        console.log('positionLoop');
        if (!this.state.trackingLoopEnabled) {
            console.log('exiting positionLoop');
            return;
        }

        var canvas = this.state.canvas;
        const canvasWidth = canvas.scrollWidth;
        const canvasHeight = canvas.scrollHeight;
        const animationFrameId = requestAnimationFrame(this.positionLoop);
        this.setState({ animationFrameId });

        var positions = this.state.ctracker.getCurrentPosition();
        if (positions) {
            const headWidth = canvasWidth * Math.abs(positions[14][0] - positions[0][0]) * 1.2 / 130;
            const halfHeadHeight = canvasHeight * (Math.abs(positions[62][1] - positions[7][1]) / 100) * 0.6;
            const x = canvasWidth - canvasWidth * positions[14][0] / 130;
            const y = (canvasHeight * Math.max(positions[20][1], positions[21][1], positions[17][1], positions[16][1]) / 100) - halfHeadHeight;
            this.props.setCoords({ x, y, headWidth });
        }
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
        const animationFrameId = this.state.animationFrameId;
        cancelAnimationFrame(animationFrameId);
        this.setState({ canvas: null, animationFrameId: null, trackingLoopEnabled: false });

        const ctracker = this.state.ctracker;
        if (ctracker) {
            ctracker.stop();
        }
    }

    render() {
        return (
            <div />
        );

    }
}

const mapDispatch = dispatch => ({
    setCoords: obj => dispatch(setCoords(obj))
});

export default connect(null, mapDispatch)(FaceRecognition);


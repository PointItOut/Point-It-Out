import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import sizeMe from 'react-sizeme'
import Confetti from 'react-confetti'
import { updateScore } from '../store/score'
import { connect } from 'react-redux'

const AddConfetti = sizeMe({
    monitorHeight: true,
    monitorWidth: true,
})(class Example extends React.PureComponent {
    static propTypes = {
        size: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number,
        }),
    }
    componentDidMount() {
        this.props.updateScore(0)
    }
    render() {
        return (
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'
            }}>
                < Confetti {...this.props.size} />
            </div >
        )
    }
})

const mapDispatchToProps = function (dispatch) {
    return {
        updateScore: (score) => dispatch(updateScore(score)),
    }
}


export default connect(null, mapDispatchToProps)(AddConfetti)

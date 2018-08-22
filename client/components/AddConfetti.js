import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import sizeMe from 'react-sizeme'
import Confetti from 'react-confetti'
import { updateScore } from '../store/score'
import { connect } from 'react-redux'
import { deleteQuestions } from '../store/questions'
import { setTimeOver } from '../store/game'

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
    render() {
        return (
            <div
                className="no-interaction" style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'
                }}>
                <Confetti {...this.props.size} confettiSource={{ x: 100, y: 0, w: 1000, h: 0 }} />
            </div >
        )
    }
})

const mapDispatchToProps = function (dispatch) {
    return {
        updateScore: (score) => dispatch(updateScore(score)),
        deleteQuestions: () => dispatch(deleteQuestions()),
        setTimeOver: (logic) => dispatch(setTimeOver(logic))
    }
}


export default connect(null, mapDispatchToProps)(AddConfetti)

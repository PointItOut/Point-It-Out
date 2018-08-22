import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {me} from '../store/user'
import socket from '../socket'
import {Navbar} from '.'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'
import soundsObject from '../sounds'

class Lobby extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  async componentDidMount() {
    await this.props.me()
    console.log('THE USER: ', this.props.user)
    soundsObject.waiting.play()
  }

  componentWillUnmount() {
    soundsObject.waiting.stop()
  }

  handleClick(currentgame) {
    socket.emit('startGame', {currentgame})
  }

  render() {
    const { user, opponent, currentgame } = this.props
    const opponentNames = Object.keys(opponent)

    // console.log('current game is', currentgame.name)

    return (
      <div className="lobby">
        <div className="col-sm-12 col-md-8 offset-md-2">
          {user.host ? (
            <div>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => this.handleClick(currentgame)}
              >
                Start game!
              </button>
            </div>
          ) : (
            <p>
              <FontAwesomeIcon icon={faSpinner} spin />
              &nbsp;Waiting for host to start the game
            </p>
          )}
          <div>
            {user.host && opponentNames.length === 1 ? (
              <p>
                <FontAwesomeIcon icon={faSpinner} spin />&nbsp;Waiting for
                people to join the game
              </p>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  opponent: state.opponent,
  user: state.user,
  startGame: state.game.startGame
})

const mapDispatch = dispatch => ({
  me: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(Lobby)

// PROP TYPES
Lobby.propTypes = {
  user: PropTypes.object,
  opponent: PropTypes.object,
  currentgame: PropTypes.object,
  startGame: PropTypes.bool,
  me: PropTypes.func
}

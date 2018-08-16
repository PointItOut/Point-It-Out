import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import socket from '../socket'

class Lobby extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  async componentDidMount() {
    await this.props.me()
    console.log('THE USER: ', this.props.user)
  }
  handleClick(currentgame) {
    socket.emit('startGame', {currentgame})
  }

  render() {
    const user = this.props.user
    const opponent = this.props.opponent
    const opponentNames = Object.keys(opponent)
    const currentgame = this.props.currentgame

    return (
      <div>
        {user.host ? (
          <div>
            <h3>You are the host</h3>
            <button type="button" onClick={() => this.handleClick(currentgame)}>
              Start game!
            </button>
          </div>
        ) : (
          <h3>Waiting for host to start the game</h3>
        )}
        <div>
          {user.host && opponentNames.length === 1 ? (
            <h3> Waiting for people to join the game</h3>
          ) : null}
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

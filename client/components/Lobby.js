import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import socket from '../socket'
import {Navbar} from '.'

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
    console.log('current game is', currentgame.name)

    return (
      <div className="lobby">
        <div className="col-sm-12 col-md-8 offset-md-2">
          {user.host ? (
            <div>
              {/* <h2 className="text-center">
                GAME: {currentgame.name.toUpperCase()}
              </h2> */}
              <button
                className="btn btn-main"
                type="button"
                onClick={() => this.handleClick(currentgame)}
              >
                Start game!
              </button>
            </div>
          ) : (
            <p>
              <i className="fas fa-spinner fa-spin" />&nbsp;Waiting for host to
              start the game
            </p>
          )}
          <div>
            {user.host && opponentNames.length === 1 ? (
              <p>
                <i className="fas fa-spinner fa-spin" />&nbsp;Waiting for people
                to join the game
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

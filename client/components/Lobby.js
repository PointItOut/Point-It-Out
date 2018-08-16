import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Opentok } from './index'
import { me } from '../store/user'
import socket from '../socket'
import { startGame } from '../store/game'

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
    socket.emit('startGame', { currentgame })
  }

  render() {
    const user = this.props.user
    const opponent = this.props.opponent
    const opponentNames = Object.keys(opponent)
    const games = this.props.games
    const token = this.props.token
    const name = this.props.match.params.name
    const currentgame = games.find(game => game.name === name)
    return (
      <div>
        {
          user.host ? (
            <div>
              <h3>You are the host</h3>

              <button type="button" onClick={() => this.handleClick(currentgame)}>
                Start game!
            </button>
            </div>
          ) : (
              <h3>Waiting for host to start the game</h3>
            )
        }
        < div >
          {
            user.host && opponentNames.length === 1 ? (
              <h3> Waiting for people to join the game</h3>
            ) : null
          }
        </div >
        {
          this.props.startGame
            ? this.props.history.push(`/game/${currentgame.name}/start`)
            : null
        }
        < Opentok currentgame={currentgame} token={token} />
      </div >
    )
  }
}

const mapState = state => ({
  opponent: state.opponent,
  token: state.game.token,
  games: state.game.games,
  user: state.user,
  startGame: state.game.startGame
})

const mapDispatch = dispatch => ({
  me: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(Lobby)

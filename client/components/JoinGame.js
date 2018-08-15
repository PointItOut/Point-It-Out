import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getGames, updateGame } from '../store/game'
import { withRouter } from 'react-router-dom'
import socket from '../socket'

class JoinGame extends Component {
  constructor() {
    super()
    this.state = {
      joinGame: '',
      nameExist: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    await this.props.getGames()
  }

  handleChange(evt) {
    this.setState({ joinGame: evt.target.value })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    const gameName = this.state.joinGame
    const gamesArray = this.props.games
    const existGame = gamesArray.find(game => game.name === gameName)
    const username = this.props.user.userName

    if (!existGame) {
      this.setState({ nameExist: false })
    } else {
      this.setState({ nameExist: true })
      socket.emit('questions', { gameName })
      socket.emit('new-score', { username, total: 0, gameName })
      await this.props.updateGame(gameName)
      this.setState({ joinGame: '' })
      this.props.history.push(`/game/${gameName}`)
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="joinGame">
              Join A Game{' '}
              {!this.state.nameExist && <span>game doesn't exist</span>}
            </label>
            <input
              type="text"
              name="joinGame"
              value={this.state.joinGame}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">Play</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    updateGame: name => dispatch(updateGame(name)),
    getGames: () => dispatch(getGames())
  }
}

const mapState = state => {
  return {
    games: state.game.games,
    user: state.user
  }
}

const ConnectJoinGame = withRouter(
  connect(mapState, mapDispatchToProps)(JoinGame)
)
export default ConnectJoinGame

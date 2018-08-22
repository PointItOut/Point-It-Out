import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getGames, updateGame} from '../store/game'
import {withRouter} from 'react-router-dom'
import socket from '../socket'
import {isScreenLarge, tooSmallToast, noCamera} from '../canPlay'

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

  handleChange(evt) {
    this.setState({joinGame: evt.target.value})
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    await this.props.getGames()
    const gameName = this.state.joinGame
    const gamesArray = this.props.games
    const existGame = gamesArray.find(game => game.name === gameName)
    const username = this.props.user.userName
    if (isScreenLarge()) {
      if (!existGame) {
        this.setState({nameExist: false})
      } else {
        this.setState({nameExist: true})
        socket.emit('questions', {gameName})
        socket.emit('new-score', {username, total: 0, gameName})
        await this.props.updateGame(gameName)
        this.setState({joinGame: ''})
        this.props.history.push(`/game/${gameName}`)
      }
    } else {
      tooSmallToast()
    }
  }

  render() {
    return (
      <div>
        <div className="card">
          <div className="card-header accent-header">
            <h4 className="text-center">JOIN EXISTING GAME</h4>
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="joinGame">Enter game name</label>
                <input
                  type="text"
                  name="joinGame"
                  value={this.state.joinGame}
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit" className="btn btn-main">
                Join
              </button>
              {!this.state.nameExist && (
                <span>Game does not exist, please try again</span>
              )}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = function(dispatch) {
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

// PROP TYPES
JoinGame.propTypes = {
  games: PropTypes.array,
  user: PropTypes.object,
  updateGame: PropTypes.func,
  getGames: PropTypes.func
}

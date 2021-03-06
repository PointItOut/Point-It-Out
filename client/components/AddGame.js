import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { postGame, getGames } from '../store/game'
import { withRouter } from 'react-router-dom'
import socket from '../socket'
import { setTimeOver } from '../store/game'

class AddGame extends Component {
  constructor() {
    super()
    this.state = {
      newGame: '',
      nameExist: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    await this.props.getGames()
    await this.props.setTimeOver(false)
  }

  handleChange(evt) {
    this.setState({ newGame: evt.target.value })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    const gameName = this.state.newGame
    const gamesArray = this.props.games
    const existGame = gamesArray.find(game => game.name === gameName)
    const username = this.props.user.userName

    if (existGame) {
      this.setState({ nameExist: true })
    } else {
      const current = this.props.current
      const questions = this.props.questions
      this.setState({ nameExist: false })
      socket.emit('questions', { questions, gameName })
      socket.emit('new-score', { username, total: 0, gameName })
      await this.props.postGame(gameName, current.id)
      this.setState({ newGame: '' })
      this.props.history.push(`/game/${gameName}`)
    }
  }

  render() {
    return (
      <div>
        <h4>Step 3: Create a game</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="col-sm-12">
            <label htmlFor="newGame">Name for your game:</label>
            <input
              type="text"
              name="newGame"
              className="form-control"
              value={this.state.newGame}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Play
          </button>

          {this.state.nameExist && (
            <span>This name is in use, please choose a new name</span>
          )}
        </form>
        <h6> Remember to share the name of your game with your friends!</h6>
        <br />
      </div>
    )
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    postGame: (name, current) => dispatch(postGame(name, current)),
    getGames: () => dispatch(getGames()),
    setTimeOver: logic => dispatch(setTimeOver(logic))
  }
}

const mapState = state => {
  return {
    games: state.game.games,
    user: state.user,
    questions: state.questions,
    current: state.categories.current
  }
}

const ConnectAddGame = withRouter(
  connect(mapState, mapDispatchToProps)(AddGame)
)
export default ConnectAddGame

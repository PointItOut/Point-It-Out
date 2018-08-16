<<<<<<< HEAD
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getGames } from '../store/game'
import { Opentok, GameSidebar, CameraCanvas } from './index'
import { getQuestions } from '../store/questions'
=======
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getGames, startGame} from '../store/game'
import {Opentok, GameSidebar, CameraCanvas, Lobby} from './index'
import {getQuestions} from '../store/questions'
>>>>>>> master

class PartnerMode extends Component {
  constructor() {
    super()
  }

  async componentDidMount() {
    await this.props.getGames()
  }

  render() {
    const games = this.props.games
    const user = this.props.user
    const name = this.props.match.params.name
    const token = this.props.token
    const currentgame = games.find(game => game.name === name)
    return (
      <div className="game-wrapper">
        {!this.props.startGame ? (
          <Lobby currentgame={currentgame} token={token} />
        ) : (
          <div>
            <CameraCanvas questions={this.props.questions} />
          </div>
        )}
        <GameSidebar
          currentgame={currentgame}
          token={token}
          startGame={this.props.startGame}
        />
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
    category: state.category,
    games: state.game.games,
    user: state.user,
    token: state.game.token,
    questions: state.questions,
    startGame: state.game.startGame
  }
}

export default connect(mapState, mapDispatchToProps)(PartnerMode)

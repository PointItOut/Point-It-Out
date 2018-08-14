import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getGames} from '../store/game'
import {Opentok, GameSidebar, CameraCanvas} from './index'
import {getQuestions} from '../store/questions'

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
<<<<<<< HEAD
      <div className="game-wrapper">
        <CameraCanvas questions={this.props.questions} />
        <GameSidebar />
        <Opentok currentgame={currentgame} token={token} />
=======
      <div>
        <h2>Partner Mode</h2>
        <Opentok currentgame={currentgame} token={token} user={user} />
>>>>>>> master
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
    category: state.category,
    games: state.game.games,
    user: state.user,
    token: state.game.token,
    questions: state.questions
  }
}

export default connect(mapState, mapDispatchToProps)(PartnerMode)

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getGames, startGame, updateGame} from '../store/game'
import {Opentok, GameSidebar, CameraCanvas, Lobby} from './index'
import {getQuestions} from '../store/questions'
import Countdown from '../../node_modules/react-countdown-now'
import {withRouter} from 'react-router-dom'

class PartnerMode extends Component {
  constructor() {
    super()
  }

  async componentDidMount() {
    console.log('Getting games')
    await this.props.getGames()
  }

  render() {
    if (!this.props.games.length) {
      this.props.history.push('/home')
      return null
    }
    const {games, user, token, match} = this.props
    const {name} = match.params

    const currentgame = games.find(game => game.name === name)
    const renderer = ({seconds, completed}) => {
      console.log({seconds, completed})
      if (completed) {
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
      } else {
        return <span className="clock">{seconds}</span>
      }
    }

    return (
      <div>
        <Countdown
          //force componentDidmount(CDM) when this changes
          //Countdown does a setInterval only in CDM.
          key={this.props.gameCountdown}
          date={this.props.gameCountdown}
          renderer={renderer.bind(this)}
          zeroPadLength={1}
        />
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
    questions: state.questions,
    startGame: state.game.startGame,
    gameCountdown: state.game.gameCountdown
  }
}

export default withRouter(connect(mapState, mapDispatchToProps)(PartnerMode))

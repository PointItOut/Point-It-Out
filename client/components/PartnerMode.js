import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getGames, startGame, updateGame} from '../store/game'
import {Opentok, GameSidebar, CameraCanvas, Lobby} from './index'
import {getQuestions} from '../store/questions'
import Countdown from '../../node_modules/react-countdown-now'
import {withRouter} from 'react-router-dom'
import soundsObject from '../sounds'

class PartnerMode extends Component {
  constructor() {
    super()
    this.state = {
      ticker: null
    }
  }

  async componentDidMount() {
    console.log('Getting games')
    await this.props.getGames()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.gameCountdown !== this.props.gameCountdown &&
      !prevProps.timeover &&
      this.props.startGame
    ) {
      soundsObject.tick.play()
      const ticker = setInterval(function() {
        soundsObject.tick.play()
      }, 1000)
      this.setState({
        ticker: ticker
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.ticker)
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
      if (completed) {
        clearInterval(this.state.ticker)
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
        return <span className="clock countdown">{seconds}</span>
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
    games: state.game.games,
    user: state.user,
    token: state.game.token,
    questions: state.questions,
    startGame: state.game.startGame,
    gameCountdown: state.game.gameCountdown,
    timeover: state.game.timeover
  }
}

export default withRouter(connect(mapState, mapDispatchToProps)(PartnerMode))

PartnerMode.propTypes = {
  games: PropTypes.array,
  user: PropTypes.object,
  token: PropTypes.string,
  questions: PropTypes.array,
  startGame: PropTypes.bool,
  gameCountdown: PropTypes.number,
  updateGame: PropTypes.func,
  getGames: PropTypes.func
}

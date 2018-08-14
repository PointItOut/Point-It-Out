import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postGame, getGames } from '../store/game'
import { withRouter } from 'react-router-dom';
import socket from '../socket'


class AddGame extends Component {

    constructor() {
        super()
        this.state = {
            newGame: '',
            nameExist: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        await this.props.getGames()
    }


    handleChange(evt) {
        this.setState({ newGame: evt.target.value })
    }

    async handleSubmit(evt) {
        evt.preventDefault();
        const gameName = this.state.newGame
        const gamesArray = this.props.games
        const existGame = gamesArray.find(game => game.name === gameName)
        const username = this.props.user.userName

        if (existGame) {
            this.setState({ nameExist: true })
        }
        else {
            this.setState({ nameExist: false })
            socket.emit('new-score', { username, total: 0 })
            await this.props.postGame(gameName);
            this.setState({ newGame: '' })
            this.props.history.push(`/game/${gameName}`)
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="newGame">Create New Game  {this.state.nameExist && <span>name is exist</span>}
                        </label>
                        <input
                            type="text"
                            name="newGame"
                            value={this.state.newGame}
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
        postGame: (name) => dispatch(postGame(name)),
        getGames: () => dispatch(getGames())
    }
}

const mapState = state => {
    return {
        games: state.game.games,
        user: state.user
    }
}



const ConnectAddGame = withRouter(connect(mapState, mapDispatchToProps)(AddGame));
export default ConnectAddGame;
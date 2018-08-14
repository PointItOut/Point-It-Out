import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getGames } from '../store/game'
import { Opentalk } from './index'

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
        const currentgame = games.find(game => game.name === name)
        console.log('game===>', games)
        return (
            <div>
                <h2>Partner Mode</h2>
                <Opentalk currentgame={currentgame} user={user} />
            </div>
        )
    }
}


const mapDispatchToProps = function (dispatch) {
    return {
        updateGame: (name) => dispatch(updateGame(name)),
        getGames: () => dispatch(getGames())
    }
}
const mapState = state => {
    return {
        category: state.category,
        games: state.game,
        user: state.user
    }
}


export default connect(mapState, mapDispatchToProps)(PartnerMode)




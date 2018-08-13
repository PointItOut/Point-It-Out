import axios from 'axios'

const CREATE_GAME = 'CREATE_GAME'
const GOT_GAMES = 'GOT_GAMES'

// INITIAL STATE
const initialState = []

// ACTION CREATORS
export const createGame = newGame => ({
    type: CREATE_GAME,
    newGame
})

export const gotGames = games => ({
    type: GOT_GAMES,
    games
})


// THUNK CREATORS
export const postGame = (gameName) => async dispatch => {
    try {
        const res = await axios.post('/api/game', { name: gameName })
        dispatch(createGame(res.data))
    } catch (err) {
        console.error(err)
    }
}

export const updateGame = (gameName) => async dispatch => {
    try {
        const res = await axios.get(`/api/game/${gameName}`)
        // dispatch(createGame(res.data))
    } catch (err) {
        console.error(err)
    }
}


export const getGames = () => async dispatch => {
    try {
        const res = await axios.get('/api/game')
        dispatch(gotGames(res.data))
    } catch (err) {
        console.error(err)
    }
}

// REDUCER
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_GAME:
            if (state === []) {
                return [action.newGame]
            }
            else {
                return [...state, action.newGame]
            }
        case GOT_GAMES: {
            return action.games
        }
        default:
            return state
    }
}

export default reducer

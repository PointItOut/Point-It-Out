import axios from 'axios'

const CREATE_GAME = 'CREATE_GAME'
const GOT_GAMES = 'GOT_GAMES'
const GOT_TOKEN = 'GOT_TOKEN'
const START_GAME = 'START_GAME'

// INITIAL STATE
const initialState = {games: [], token: '', startGame: false, gameCountdown: 3}

// ACTION CREATORS
export const createGame = data => ({
  type: CREATE_GAME,
  newGame: data.newGame,
  token: data.token
})

export const gotGames = games => ({
  type: GOT_GAMES,
  games
})

export const gotToken = data => ({
  type: GOT_TOKEN,
  token: data.token
})
export const startGame = start => ({
  type: START_GAME,
  start
})

// THUNK CREATORS
export const postGame = gameName => async dispatch => {
  try {
    const res = await axios.post('/api/game', {name: gameName})
    dispatch(createGame(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const updateGame = gameName => async dispatch => {
  try {
    const res = await axios.get(`/api/game/${gameName}`)
    dispatch(gotToken(res.data))
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
      return {
        ...state,
        games: [...state.games, action.newGame],
        token: action.token
      }
    case GOT_GAMES: {
      return {...state, games: action.games}
    }
    case GOT_TOKEN: {
      return {...state, token: action.token}
    }
    case START_GAME: {
      return {
        ...state,
        startGame: action.start,
        gameCountdown: Date.now() + 3000
      }
    }
    default:
      return state
  }
}

export default reducer

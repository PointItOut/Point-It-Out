import axios from 'axios'
import socket from '../socket'
import history from '../history'

const CREATE_GAME = 'CREATE_GAME'
const GOT_GAMES = 'GOT_GAMES'
const GOT_TOKEN = 'GOT_TOKEN'
const START_GAME = 'START_GAME'
const START_SOLO_GAME = 'START_SOLO_GAME'
const FILTERS_GAMES = 'FILTERS_GAMES'
const SET_TIME_OVER = 'SET_TIME_OVER'

// INITIAL STATE
const initialState = {
  games: [],
  token: '',
  startGame: false,
  gameCountdown: 3,
  timeover: false
}

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

export const filterGames = game => ({
  type: FILTERS_GAMES,
  game
})

export const setTimeOver = timeover => {
  return {
    type: SET_TIME_OVER,
    timeover
  }
}

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

export const deleteGame = (gameName, correntmode) => async dispatch => {
  try {
    const res = await axios.delete(`/api/game/${gameName}`)
    if (correntmode) {
      // socket.emit('redirect', gameName)
      socket.emit('delete-game', gameName)
      // history.push('/home')
    }
    // dispatch(filterGames(res.data))
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
    case FILTERS_GAMES: {
      const gameName = action.game
      console.log('gameName', gameName.gameName)
      const newGames = state.games.filter(
        game => game.name !== gameName.gameName
      )

      return {...state, games: newGames}
    }
    case SET_TIME_OVER: {
      return {...state, timeover: action.timeover}
    }
    default:
      return state
  }
}

export default reducer

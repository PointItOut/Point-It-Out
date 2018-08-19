import socket from '../socket'
import axios from 'axios'

// ACTION TYPES
const UPDATE_SCORE = 'UPDATE_SCORE'

// INITIAL STATE
const initialState = 0

// ACTION CREATORS
export const updateScore = (total, partner, username, gameName) => {
  if (partner === true) {
    socket.emit('new-score', { total, username, gameName })
  }
  return {
    type: UPDATE_SCORE,
    total
  }
}

export const setHighScore = (score) => async dispatch => {
  try {
    const res = await axios.put('/api/users/score', { score: score })
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SCORE:
      return action.total
    default:
      return state
  }
}

export default reducer

import socket from '../socket'

// ACTION TYPES
const UPDATE_SCORE = 'UPDATE_SCORE'

// INITIAL STATE
const initialState = 0

// ACTION CREATORS
export const updateScore = (total, partner, username, gameName) => {
  if (partner === true) {
    socket.emit('new-score', { total, username, gameName })
  }
  else {
    return {
      type: UPDATE_SCORE,
      total
    }
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

import socket from '../socket'
import axios from 'axios'

// ACTION TYPES
const UPDATE_SCORE = 'UPDATE_SCORE'
const INCREMENT_SCORE = 'INCREMENT_SCORE'

// INITIAL STATE
const initialState = 0

// ACTION CREATORS
export const resetScore = () => {
  return {
    type: UPDATE_SCORE,
    total: 0
  }
}

export const updateScore = (total, partner, username, gameName) => {
  if (partner === true) {
    socket.emit('new-score', { total, username, gameName })
  }
  return {
    type: UPDATE_SCORE,
    total
  }
}

const incrementScore = () => ({
  type: INCREMENT_SCORE
})

// THUNK CREATORS
export const evaluateAnswer = (choiceObj, gameObj) => async dispatch => {
  try {
    const { tutorialMode, partnerMode, oldTotal, userId, username, gameName } = gameObj

    const { data } = await axios.post(`/api/game/guess/${choiceObj.id}`, { userId, tutorialMode })

    if (data === 'correct') {
      dispatch(incrementScore())
      if (partnerMode === true) {
        socket.emit('new-score', {total: oldTotal + 1, username, gameName})
      }
    }

  } catch (err) { console.error(err) }
}

export const setHighScore = (score, currentCategory, user) => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${user.id}/scores`, {
      score: score,
      category: currentCategory
    })
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SCORE:
      return action.total
    case INCREMENT_SCORE:
      return state + 1
    default:
      return state
  }
}

export default reducer

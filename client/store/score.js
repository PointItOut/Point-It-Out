// ACTION TYPES
const UPDATE_SCORE = 'UPDATE_SCORE'

// INITIAL STATE
const initialState = 0

// ACTION CREATORS
export const updateScore = score => ({
  type: UPDATE_SCORE,
  score
})

// REDUCER
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_SCORE:
      return action.score
    default:
      return state
  }
}

export default reducer

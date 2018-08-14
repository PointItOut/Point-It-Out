
// INITIAL STATE
const initialState = {question: {}, userGuess: null}

// ACTION TYPES
const SET_QUESTION = 'SET_CURRENT_QUESTION'
const SUBMIT_ANSWER = 'SUBMIT_ANSWER'

// ACTION CREATORS
export const setQuestion = question => ({
  type: SET_QUESTION,
  question
})

export const submitAnswer = userGuess => ({
  type: SUBMIT_ANSWER,
  userGuess
})

// REDUCER
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_QUESTION:
      return {
        ...state,
        question: action.question
      }
    case SUBMIT_ANSWER:
      return {
        ...state,
        userGuess: state.userGuess === null || action.userGuess === null ? action.userGuess : state.userGuess
      }
    default:
      return state
  }
}

export default reducer


// INITIAL STATE
const initialState = {text: '', choices: [], id: 0, userGuess: null}

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
        text: action.question ? action.question.text : '',
        choices: action.question ? action.question.choices : [],
        id: action.question ? action.question.id : 0
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

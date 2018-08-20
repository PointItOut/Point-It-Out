
// INITIAL STATE
const initialState = {text: '', choices: [], id: 0, userGuessIndex: null}

// ACTION TYPES
const SET_QUESTION = 'SET_CURRENT_QUESTION'
const SUBMIT_ANSWER_INDEX = 'SUBMIT_ANSWER'

// ACTION CREATORS
export const setQuestion = question => ({
  type: SET_QUESTION,
  question
})

export const submitAnswerIndex = userGuessIndex => ({
  type: SUBMIT_ANSWER,
  userGuessIndex
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
    case SUBMIT_ANSWER_INDEX:
      return {
        ...state,
        userGuessIndex: state.userGuessIndex === null || action.userGuessIndex === null ? action.userGuessIndex : state.userGuessIndex
      }
    default:
      return state
  }
}

export default reducer

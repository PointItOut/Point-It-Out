import axios from 'axios'

// INITIAL STATE
const initialState = {question: {}, userGuess: null}

// ACTION TYPES
const SETTING_CURRENT_QUESTION = 'SETTING_CURRENT_QUESTION'
const SUBMIT_ANSWER = 'SUBMIT_ANSWER'

// ACTION CREATORS
export const setCurrentQuestion = question => ({
  type: SETTING_CURRENT_QUESTION,
  question
})

export const submitAnswer = userGuess => ({
  type: SUBMIT_ANSWER,
  userGuess
})

// REDUCER
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SETTING_CURRENT_QUESTION:
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

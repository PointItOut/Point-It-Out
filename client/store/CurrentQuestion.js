import axios from 'axios'

// INITIAL STATE
const initialState = {question: '', choices: [], userGuess: '', isCorrect: ''}

// ACTION TYPES
const SETTING_CURRENT_QUESTION = 'ETTING_CURRENT_QUESTION'
const SUBMIT_ANSWER = 'SUBMIT_ANSWER'

// ACTION CREATORS
export const setCurrentQuestion = question => ({
  type: SETTING_CURRENT_QUESTION,
  question
})

export const submitAnswer = (userGuess, isCorrect) => ({
  type: SUBMIT_ANSWER,
  userGuess,
  isCorrect
})

// THUNK CREATORS

const evaluateAnswer = userGuess => async dispatch => {}

// REDUCER

export default reducer

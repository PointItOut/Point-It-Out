import axios from 'axios'

// INITIAL STATE
const initialState = {text: '', choices: [], id: 0, userGuess: null}

// ACTION TYPES
const SET_QUESTION = 'SET_CURRENT_QUESTION'
const GOT_ANSWER = 'GOT_ANSWER'

// ACTION CREATORS
export const setQuestion = question => ({
  type: SET_QUESTION,
  question
})

// userGuess now will be string of 'correct' or 'incorrect'
export const gotAnswer = userGuess => ({
  type: GOT_ANSWER,
  userGuess
})

// THUNK CREATORS
export const submitAnswer = (choiceObj, userId) => async dispatch => {
  try {
    const { data } = await axios.post(`/api/game/guess/${userId}`, { id: choiceObj.id, questionId: choiceObj.questionId })
    // data should be a string of 'correct' or 'incorrect'
    dispatch(gotAnswer(data))
  } catch (err) { console.error(err) }
}

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
    case GOT_ANSWER:
      return {
        ...state,
        userGuess: state.userGuess === null || action.userGuess === null ? action.userGuess : state.userGuess
      }
    default:
      return state
  }
}

export default reducer

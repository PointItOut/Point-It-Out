import axios from 'axios'
import history from '../history'
import socket from '../socket'
import {startGame} from './game'
import {updateScore} from './score'

//ACTION TYPES
const GOT_QUESTIONS_FOR_CATEGORY = 'GOT_QUESTIONS_FOR_CATEGORY'
const DELETE_QUESTIONS = 'DELETE_QUESTIONS'
const GOT_TUTORIAL_QUESTIONS = 'GOT_TUTORIAL_QUESTIONS'

// ACTION CREATORS
export const gotQuestionsForCategory = questions => ({
  type: GOT_QUESTIONS_FOR_CATEGORY,
  questions
})

export const deleteQuestions = () => ({
  type: DELETE_QUESTIONS
})

const gotTutorialQuestions = questions => ({
  type: GOT_TUTORIAL_QUESTIONS,
  questions
})

//THUNK CREATORS

export const getQuestions = (chosenCategory, currentMode) => async dispatch => {
  try {
    const res = await axios.get(`/api/questions/${chosenCategory.id}`)

    const questionArr = res.data
    //Shuffeling the options
    for (let i = 0; i < questionArr.length; i++) {
      questionArr[i].choices = shuffleArray(questionArr[i].choices)
    }
    const shuffledQuestions = shuffleArray(questionArr)
    //dispatching shuffled questions
    dispatch(gotQuestionsForCategory(shuffledQuestions))
    if (currentMode === 'solo') {
      dispatch(startGame(true))
      dispatch(updateScore(0))
      history.push('/solo')
    }
  } catch (err) {
    console.error(err)
  }
}

export const getTutorialQuestions = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/tutorial')
    dispatch(gotTutorialQuestions(data.questions))
  } catch (err) { console.error(err) }
}

//REDUCER
const reducer = (state = [], action) => {
  switch (action.type) {
    case GOT_QUESTIONS_FOR_CATEGORY:
      return action.questions
    case DELETE_QUESTIONS:
      return []
    case GOT_TUTORIAL_QUESTIONS:
      return action.questions
    default:
      return state
  }
}
export default reducer

//Helper Functions
function shuffleArray(array) {
  let modified = [...array]
  for (let i = modified.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[modified[i], modified[j]] = [modified[j], modified[i]]
  }
  return modified
}

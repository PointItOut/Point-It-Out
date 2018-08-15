import axios from 'axios'
import history from '../history'
import socket from '../socket'

//ACTION TYPES
const GOT_QUESTIONS_FOR_CATEGORY = 'GOT_QUESTIONS_FOR_CATEGORY'

// ACTION CREATORS
export const gotQuestionsForCategory = questions => ({
  type: GOT_QUESTIONS_FOR_CATEGORY,
  questions
})

//THUNK CREATORS

export const getQuestions = (chosenCategory, currentMode) => async dispatch => {
  try {
    const res = await axios.get(`/api/questions/${chosenCategory}`)

    const questionArr = res.data
    //Shuffeling the options
    for (let i = 0; i < questionArr.length; i++) {
      questionArr[i].choices = shuffleArray(questionArr[i].choices)
    }
    const shuffledQuestions = shuffleArray(questionArr)
    //dispatching shuffled questions
    dispatch(gotQuestionsForCategory(shuffledQuestions))
    if (currentMode === 'solo') {
      history.push('/solo')
    } else {
      socket.emit('questions', shuffledQuestions)
    }
  } catch (err) {
    console.error(err)
  }
}

//REDUCER
const reducer = (state = [], action) => {
  switch (action.type) {
    case GOT_QUESTIONS_FOR_CATEGORY:
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

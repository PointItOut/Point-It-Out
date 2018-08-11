import axios from 'axios'

//ACTION TYPES
const GOT_QUESTIONS_FOR_CATEGORY = 'GOT_QUESTIONS_FOR_CATEGORY'

// ACTION CREATORS
const gotQuestionsForCategory = questions => ({
  type: GOT_QUESTIONS_FOR_CATEGORY,
  questions
})

//THUNK CREATORS

export const getQuestions = chosenCategory => async dispatch => {
  try {
    const res = await axios.get(`/api/questions/${chosenCategory}`)
    dispatch(gotQuestionsForCategory(res.data))
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

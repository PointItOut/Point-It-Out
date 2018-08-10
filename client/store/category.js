import axios from 'axios'
import history from '../history'

// ACTION TYPES
const SET_CATEGORY = 'SET_CATEGORY'

// INITIAL STATE
const initialState = ''

// ACTION CREATORS
export const setCategory = category => ({
  type: SET_CATEGORY,
  category
})

// THUNK CREATORS

// REDUCER
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_CATEGORY:
      return action.category
    default:
      return state
  }
}

export default reducer

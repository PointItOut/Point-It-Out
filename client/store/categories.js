import axios from 'axios'
import history from '../history'

// ACTION TYPES
const SET_CATEGORY = 'SET_CATEGORY'
const GET_PUBLIC_CATEGORIES = 'GET_PUBLIC_CATEGORIES'
const GET_PRIVATE_CATEGORIES = 'GET_PRIVATE_CATEGORIES'

// INITIAL STATE
const initialState = {
  public: [],
  private: [],
  current: {}
}

// ACTION CREATORS
const setCategory = category => ({
  type: SET_CATEGORY,
  category
})

const getPublicCategories = publicCategories => ({
  type: GET_PUBLIC_CATEGORIES,
  publicCategories
})

const getPrivateCategories = privateCategories => ({
  type: GET_PRIVATE_CATEGORIES,
  privateCategories
})

// THUNK CREATORS
export const setCurrentCategory = category => async dispatch => {
  try {
    // we want to return a category object with topScores on it
    const { data } = await axios.get(`/api/categories/${category.id}`)
    // history.push(`/home/${category.id}`)
    dispatch(setCategory(data))
  } catch (err) { console.error(err) }
}

export const retrievePublicCategories = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/categories/public')
    dispatch(getPublicCategories(data))
  } catch (err) { console.error(err) }
}

export const retrievePrivateCategories = userId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/categories/private/${userId}`)
    dispatch(getPrivateCategories(data))
  } catch (err) { console.error(err) }
}

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return { ...state, current: action.category }
    case GET_PUBLIC_CATEGORIES:
      return { ...state, public: action.publicCategories }
    case GET_PRIVATE_CATEGORIES:
      return { ...state, private: action.privateCategories }
    default:
      return state
  }
}

export default reducer

import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import category from './category'
import questions from './questions'
<<<<<<< HEAD
import game from './game'

const reducer = combineReducers({ user, category, questions, game })
=======
import currentQuestion from './CurrentQuestion'

const reducer = combineReducers({ user, category, questions, currentQuestion })
>>>>>>> master
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'

import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {getQuestions} from './question'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

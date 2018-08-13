/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {getQuestions} from './questions'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {question: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getQuestions', () => {
    it('eventually dispatches the GOT_QUESTIONS_FOR_CATEGORY action', async () => {
      const fakeQuestions = [
        {
          id: 1,
          theQuestion: 'What is the capital of Russia?',
          category: 'geography'
        }
      ]

      const chosenCategory = 'geography'
      mockAxios.onGet('/api/questions/geography').replyOnce(200, fakeQuestions)
      await store.dispatch(getQuestions(chosenCategory))

      const actions = store.getActions() // not getting any actions
      expect(actions[0].type).to.be.equal('GOT_QUESTIONS_FOR_CATEGORY')
      expect(actions[0].questions).to.be.deep.equal(fakeQuestions)
    })
  })
})

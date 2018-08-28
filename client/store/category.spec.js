import {expect} from 'chai'
import {setCategory} from './categories'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('action creators', () => {
  let store

  const initialState = {category: ''}

  beforeEach(() => {
    store = mockStore(initialState)
  })

  afterEach(() => {
    store.clearActions()
  })

  describe('set category', () => {
    it('create an action object with type set category and the category', async () => {
      const fakeCategory = 'art'
      expect(setCategory(fakeCategory).type).to.be.equal('SET_CATEGORY')
      expect(setCategory(fakeCategory).category).to.be.equal('art')

      await store.dispatch(setCategory(fakeCategory))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('SET_CATEGORY')
      expect(actions[0].category).to.be.deep.equal('art')
    })
  })
})

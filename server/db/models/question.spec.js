const expect = require('chia').expect

const Question = require('../models/question')
describe('Question model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
})

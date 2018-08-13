const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const {Choice, Question} = require('../db/models')

const questions = [
  {
    theQuestion: 'What is the capital of Russia',
    category: 'geography'
  },
  {
    theQuestion: 'Who was the first U.S. President',
    category: 'history'
  },
  {
    theQuestion: 'Who was the artist who painted Starry Night',
    category: 'art'
  }
]

const choices = [
  {
    theChoice: 'Moscow',
    isCorrect: true,
    isPicture: false,
    questionId: 1
  },
  {
    theChoice: 'Boston',
    isCorrect: false,
    isPicture: false,
    questionId: 1
  },
  {
    theChoice: 'Tel Aviv',
    isCorrect: false,
    isPicture: false,
    questionId: 1
  },
  {
    theChoice: 'D.C.',
    isCorrect: false,
    isPicture: false,
    questionId: 1
  }
]

describe('Question routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
      .then(() => Question.bulkCreate(questions))
      .then(() => Choice.bulkCreate(choices))
  })

  afterEach(() => {
    return db.sync({force: true})
  })

  describe('/api/questions/:category', () => {
    it('GET /api/questions/:categories', async () => {
      const res = await request(app)
        .get('/api/questions/history')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(1)
      expect(res.body[0].choices).to.be.an('array')
    })
  })

  describe('/api/questions/', () => {
    it('GET /api/questions', async () => {
      const res = await request(app)
        .get('/api/questions')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(3)
      const myQuestion = res.body.find(elem => elem.id === 1)
      expect(myQuestion.theQuestion).to.be.equal('What is the capital of Russia')
      expect(myQuestion.choices.length).to.be.equal(4)
    })
  })
})

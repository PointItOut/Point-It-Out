const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const {Choice, Question} = require('../db/models')

const questions = [
  {
    text: 'What is the capital of Russia',
    categoryId: 1
  },
  {
    text: 'Who was the first U.S. President',
    categoryId: 2
  },
  {
    text: 'Who was the artist who painted Starry Night',
    categoryId: 3
  }
]

const choices = [
  {
    text: 'Moscow',
    isCorrect: true,
    isPicture: false,
    questionId: 1
  },
  {
    text: 'Boston',
    isCorrect: false,
    isPicture: false,
    questionId: 1
  },
  {
    text: 'Tel Aviv',
    isCorrect: false,
    isPicture: false,
    questionId: 1
  },
  {
    text: 'D.C.',
    isCorrect: false,
    isPicture: false,
    questionId: 1
  }
]

describe('Question routes', () => {
  beforeEach(() => {
    return db
      .sync({force: true})
      .then(() => Question.bulkCreate(questions))
      .then(() => Choice.bulkCreate(choices))
  })

  afterEach(() => {
    return db.sync({force: true})
  })

  describe('/api/questions/:categoryId', () => {
    it('GET /api/questions/:categoryId', async () => {
      const res = await request(app)
        .get('/api/questions/1')
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
      expect(myQuestion.text).to.be.equal('What is the capital of Russia')
      expect(myQuestion.choices.length).to.be.equal(4)
    })
  })
})

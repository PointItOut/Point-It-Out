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
    isPicture: false
  },
  {
    theChoice: 'Boston',
    isCorrect: false,
    isPicture: false
  },
  {
    theChoice: 'Tel Aviv',
    isCorrect: false,
    isPicture: false
  },
  {
    theChoice: 'D.C.',
    isCorrect: false,
    isPicture: false
  }
]

describe('Question routes', () => {
  beforeEach(async () => {
    await db.sync({force: true})
    Question.bulkCreate(questions)
    const myChoices = await Choice.bulkCreate(choices)
    const aQuestion = await Question.findById(1)
    await aQuestion.setChoices(myChoices)
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
      //add a test for choices
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
      expect(myQuestion.theQuestion).to.be.equal(
        'What is the capital of Russia'
      )
      expect(myQuestion.choices.length).to.be.equal(4)
    })
  })
})

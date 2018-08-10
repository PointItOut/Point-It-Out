const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const {Choice, Question} = require('../db/models')

describe('Question routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/questions/', () => {
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

    beforeEach(async () => {
      Question.bulkCreate(questions)
      Choice.bulkCreate(choices)
      const myQuestion = await Question.findOne()
      console.log(myQuestion)
      // myQuestion.setChoices(choices)
    })
    it('GET /api/questions', async () => {
      const res = await request(app)
        .get('/api/questions')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(3)
      expect(res.body.find(elem => elem.id === 1).theQuestion).to.be.equal(
        'What is the capital of Russia'
      )
      expect(res.body[0].choices).to.be.equal(4)
    })
  })
})

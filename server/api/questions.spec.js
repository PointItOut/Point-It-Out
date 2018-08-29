const {expect} = require('chai')
const session = require('supertest-session')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const {Choice, Question, Category} = require('../db/models')

const questions = [
  {
    text: 'What is the capital of Russia',
    categoryId: 1
  },
  {
    text: 'Who was the first U.S. President',
    categoryId: 1
  },
  {
    text: 'Who was the artist who painted Starry Night',
    categoryId: 1
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
// let authenticatedSession
describe('Question routes', () => {
  let testSession = session(app)

  beforeEach(async () => {
    let authenticatedSession = await testSession
      .post('/signup')
      .send({email: 'cody@email.com', password: '123', userName: 'Cody'})
      .expect(200)
  })

  beforeEach(() => {
    return db
      .sync({force: true})
      .then(() => Category.create({name: 'history', authorId: 1}))
      .then(() => Question.bulkCreate(questions))
      .then(() => Choice.bulkCreate(choices))
  })

  afterEach(() => {
    return db.sync({force: true})
  })

  describe('getting questions for a category', () => {
    it('GET /api/questions/:categoryId', async () => {
      const res = await request(app)
        .get('/api/questions/1')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(3)
      expect(res.body[0].choices).to.be.an('array')
    })
  })

  describe('getting all questions', () => {
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
  describe('deleting a question', () => {
    it('DELETE /api/questions/:categoryId/:questionId', async () => {
      const res = await authenticatedSession(app)
        .delete('/api/questions/1/1')
        .expect(204)
      const allQuestions = await Question.findAll()
      const allChoices = await Choice.findAll()
      expect(allQuestions.length).to.be.equal(2)
      expect(allChoices.length).to.be.equal(0)
    })
  })
})

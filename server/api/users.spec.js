/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'
    const codysUserName = 'Cody'
    beforeEach(() => {
      return User.create({
        email: codysEmail,
        highScore: 10,
        userName: codysUserName
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
      expect(res.body[0].highScore).to.be.equal(10)
      expect(res.body[0].userName).to.be.equal(codysUserName)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')

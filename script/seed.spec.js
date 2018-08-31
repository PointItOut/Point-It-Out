'use strict'
/* global describe beforeEach it */

const seed = require('./seed')
const db = require('../server/db')

describe('seed script', () => {
  it('completes successfully', seed)
})

afterEach(() => {
  return db.sync({force: true})
})

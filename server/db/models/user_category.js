const Sequelize = require('sequelize')
const db = require('../db')

const UserCategory = db.define('UserCategory', {
  userHighScore: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  correctGuesses: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  incorrectGuesses: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = UserCategory

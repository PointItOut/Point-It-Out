const Sequelize = require('sequelize')
const db = require('../db')

const Question = db.define('questions', {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true}
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

module.exports = Question

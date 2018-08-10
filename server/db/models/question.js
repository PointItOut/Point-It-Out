const Sequelize = require('sequelize')
const db = require('../db')

const Question = db.define('questionS', {
  theQuestion: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true}
  },
  category: {
    type: Sequelize.ENUM('history', 'art', 'geography')
  }
})

module.exports = Question

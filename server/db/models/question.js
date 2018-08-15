const Sequelize = require('sequelize')
const db = require('../db')

const Question = db.define('questions', {
  theQuestion: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true}
  }
})

module.exports = Question

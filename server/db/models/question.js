const Sequelize = require('sequelize')
const db = require('../db')

const Question = db.define('questions', {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true}
  }
})

module.exports = Question

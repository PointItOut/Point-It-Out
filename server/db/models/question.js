const Sequelize = require('sequelize')
const db = require('../db')

const Question = db.define('questions', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  theQuestion: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true}
  }
})

module.exports = Question

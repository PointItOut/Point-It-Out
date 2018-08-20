const Sequelize = require('sequelize')
const db = require('../db')

const Choice = db.define('choices', {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true}
  },
  isCorrect: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  picture: {
    type: Sequelize.STRING
  }
})

module.exports = Choice

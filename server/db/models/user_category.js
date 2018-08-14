const Sequelize = require('sequelize')
const db = require('../db')

const User_Category = db.define('users_categories', {
  userHighScore: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = User_Category

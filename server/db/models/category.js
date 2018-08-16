const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  public: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Category

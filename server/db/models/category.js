const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
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

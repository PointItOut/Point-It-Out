const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Game

const router = require('express').Router()
const { Game, User } = require('../db/models')
const OpenTok = require("opentok");

router.get('/', async (req, res, next) => {
    try {
        const games = await Game.findAll()
        res.json(games)
    } catch (err) {
        next(err)
    }
})

router.get('/:name', async (req, res, next) => {
    try {
        const gameName = req.params.name
        const existgame = await Game.findOne({
            where: { name: gameName }
        })
        await User.update({ gameId: existgame.id },
            { where: { id: req.user.id } })

        const game = Game.findAll({ where: { gameId: existgame.id }, include: [{ model: User }] })

        res.json(game)
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newGame = await Game.create(req.body)
        await User.update({ gameId: newGame.id },
            { where: { id: req.user.id } })

        res.json(newGame)
    } catch (err) {
        next(err)
    }
})

module.exports = router
const router = require('express').Router()
const {Game, User} = require('../db/models')
const OpenTok = require('opentok')

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
    let opentok = new OpenTok(
      process.env.OPENTOK_APIKEY,
      process.env.OPENTOK_SECRET
    )
    const gameName = req.params.name
    const existgame = await Game.findOne({
      where: {name: gameName}
    })
    let token = opentok.generateToken(existgame.sessionId)

    //send the user back as well, although we will still have to update it on state. Or I suppose we could just send the token? seems sort of hacky but it could work. in fact we may not need to store the token at all if we don't care if they can rejoin the game or not.
    // (if it's the user themselves does it matter if we send the entire object? check what is already on state)
    //why is it not working only when there are not games on state? I can see why joining an existing game would work but why is the token getting placed on state when there is a game but not when there is not one. weird.

    await User.update({gameId: existgame.id, token}, {where: {id: req.user.id}})

    res.json(existgame)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let opentok = new OpenTok(
      process.env.OPENTOK_APIKEY,
      process.env.OPENTOK_SECRET
    )

    opentok.createSession({mediaMode: 'routed'}, async function(err, session) {
      if (err) {
        console.log(err)
        res.status(500).send({error: 'createSession error: ', err})
        return
      }

      let sessionId = session.sessionId
      req.body.sessionId = sessionId
      const newGame = await Game.create(req.body)
      let token = opentok.generateToken(newGame.sessionId)
      await User.update({gameId: newGame.id, token}, {where: {id: req.user.id}})
      res.json(newGame)
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router

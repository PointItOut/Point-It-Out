const router = require('express').Router()
const { Game, User, Choice, Question } = require('../db/models')
const OpenTok = require('opentok')
const { userMatchesParam } = require('../../secureHelpers')

router.get('/', async (req, res, next) => {
  try {
    const games = await Game.findAll()
    res.json(games)
  } catch (err) {
    next(err)
  }
})

router.post('/guess/:userId', userMatchesParam, async (req, res, next) => {
  try {
    // post request must have choice id and questionId
    const userGuess = await Choice.findById(+req.body.id)
    const currentQuestion = await Question.findById(userGuess.questionId)
    const { correctGuesses, incorrectGuesses } = currentQuestion

    if (userGuess.isCorrect) {
      // increment question.correctanswers
      await currentQuestion.update({ correctGuesses: correctGuesses + 1})
      res.json('correct')
    } else {
      // increment question.incorrectanswers
      await currentQuestion.update({ incorrectGuesses: incorrectGuesses + 1})
      res.json('incorrect')
    }

  } catch (err) { next(err) }
})

router.get('/:name', async (req, res, next) => {
  try {
    let opentok = new OpenTok(
      process.env.OPENTOK_APIKEY,
      process.env.OPENTOK_SECRET
    )
    const gameName = req.params.name
    const existgame = await Game.findOne({
      where: { name: gameName }
    })
    let token = opentok.generateToken(existgame.sessionId)

    await User.update({ gameId: existgame.id, token }, { where: { id: req.user.id } })

    res.json({ token })
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

    opentok.createSession({ mediaMode: 'routed' }, async function (err, session) {
      if (err) {
        console.log(err)
        res.status(500).send({ error: 'createSession error: ', err })
        return
      }

      let sessionId = session.sessionId
      const newGame = await Game.create({ name: req.body.name, sessionId, categoryId: req.body.category })


      let token = opentok.generateToken(newGame.sessionId)
      await User.update(
        { gameId: newGame.id, host: true, token },
        { where: { id: req.user.id } }
      )
      res.json({ newGame, token })
    })
  } catch (err) {
    next(err)
  }
})


router.delete('/:name', async (req, res, next) => {
  try {
    const gameName = req.params.name;
    await User.update(
      { host: false },
      { where: { id: req.user.id } }
    )
    await Game.destroy({ where: { name: gameName } });
    res.json({ gameName })
  } catch (err) {
    next(err);
  }
});

module.exports = router

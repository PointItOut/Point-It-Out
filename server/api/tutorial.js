const router = require('express').Router()
const tutorialQuestions = require('../tutorial-questions')

router.get('/', (req, res, next) => {
  try {
    const responseBody = {
      questions: tutorialQuestions
    }
    res.json(responseBody)
  } catch (err) { next(err) }
})

module.exports = router

const router = require('express').Router()
const {Choice, Question} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const questions = await Question.findAll({
      include: {model: Choice}
    })

    res.json(questions)
  } catch (err) {
    next(err)
  }
})

router.get('/:category', async (req, res, next) => {
  try {
    const category = req.params.category
    const questions = await Question.findAll({
      where: {category: category},
      include: {model: Choice}
    })
    let questionArrey = [...questions]
    questionArrey.map(
      question => (question.choices = shuffleArrey(question.choices))
    )
    res.json(shuffleArrey(questionArrey))
    // res.json(questions)
  } catch (err) {
    next(err)
  }
})

function shuffleArrey(array) {
  let modified = [...array]
  for (let i = modified.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[modified[i], modified[j]] = [modified[j], modified[i]]
  }
  return modified
}

module.exports = router

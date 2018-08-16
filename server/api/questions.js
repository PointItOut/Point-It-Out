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

router.get('/:categoryId', async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId
    let questions = await Question.findAll({
      where: {categoryId: +categoryId},
      include: {model: Choice}
    })
    res.json(questions)
  } catch (err) {
    next(err)
  }
})

// for posting question with choices?
router.post('/', async (req, res, next) => {
  try {
    console.log('** INSIDE POST **')
    const { question, choices } = req.body
    // question object has a categoryId!!
    const newQuestion = await Question.create(question)

    const choiceObjects = choices.map(choice => ({
      ...choice,
      questionId: newQuestion.id
    }))
    const questionChoices = await Choice.bulkCreate(choiceObjects)

    const questionWithChoices = await Question.findById(newQuestion.id, { include: {model: Choice} })

    res.json(questionWithChoices)
  } catch (err) { next(err) }
})

module.exports = router

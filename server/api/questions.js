const router = require('express').Router()
const {Choice, Question, Category} = require('../db/models')
const {userOwnsCategory} = require('../../secureHelpers')

router.get('/', async (req, res, next) => {
  try {
    const questions = await Question.findAll({
      include: {model: Choice}
    })

    const responseBody = questions.map(question => {
      return {
        id: question.id,
        text: question.text,
        categoryId: question.categoryId,
        correctGuesses: question.correctGuesses,
        incorrectGuesses: question.incorrectGuesses,
        choices: question.choices.map(choice => ({id: choice.id, text: choice.text}))
      }
    })

    res.json(responseBody)
  } catch (err) {
    next(err)
  }
})

router.get('/:categoryId', async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId
    const questions = await Question.findAll({
      where: {categoryId: +categoryId},
      include: {model: Choice}
    })

    const responseBody = questions.map(question => {
      return {
        id: question.id,
        text: question.text,
        categoryId: question.categoryId,
        correctGuesses: question.correctGuesses,
        incorrectGuesses: question.incorrectGuesses,
        choices: question.choices.map(choice => ({id: choice.id, text: choice.text}))
      }
    })

    res.json(responseBody)
  } catch (err) {
    next(err)
  }
})

router.delete('/:categoryId/:questionId', userOwnsCategory, async (req, res, next) => {
  try {

    await Question.destroy({
      where: {
        id: +req.params.questionId
      }
    })

    await Choice.destroy({
      where: {
        questionId: +req.params.questionId
      }
    })

    res.status(204).send()
  } catch (err) { next(err) }
})

router.post('/', async (req, res, next) => {
  try {
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

const router = require('express').Router()
const {Choice, Question, Category} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    const { choices, questionId } = req.body

    // make sure the question we're adding choices to belongs to this req.user
    const question = await Question.findById(questionId)
    const category = await Category.findById(question.categoryId)
    if (req.user.id !== category.authorId) {
      const err = new Error('Not authorized')
      next(err)
    }

    const choiceInstances = await Promise.all(choices.map(choice => Choice.create({text: choice.text, questionId})))
    res.json(choiceInstances)
  } catch (err) { next(err) }
})

module.exports = router

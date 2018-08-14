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
    let questions = await Question.findAll({
      where: {category: category},
      include: {model: Choice}
    })
    res.json(questions)
  } catch (err) {
    next(err)
  }
})

module.exports = router

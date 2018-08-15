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

module.exports = router

const router = require('express').Router()
const {Choice} = require('../db/models')

router.post('/', async (req, res, next) => {
  // assume we get 4 choices at a time?
  try {
    const { choices, questionId } = req.body
    const choiceInstances = await Promise.all(choices.map(choice => Choice.create({...choice, questionId})))
    res.json(choiceInstances)
  } catch (err) { next(err) }
})

module.exports = router

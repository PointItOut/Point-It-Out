const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))

router.use('/game', require('./game'))

router.use('/questions', require('./questions'))

router.use('/categories', require('./categories'))

router.use('/choices', require('./choices'))

router.use('/tutorial', require('./tutorial'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

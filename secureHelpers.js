const userMatchesParam = (req, res, next) => {
  if (req.user) {
    if (+req.user.id === +req.params.userId) {
      next()
    } else {
      const err = new Error('Not authorized')
      next(err)
    }
  } else {
    const err = new Error('You must be logged in')
    next(err)
  }
}

module.exports = { userMatchesParam }

const {Category} = require('./server/db/models')

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

const userOwnsCategory = async (req, res, next) => {
  if (req.user) {
    const categoryId = +req.params.categoryId
    const category = await Category.findById(categoryId)
    if (req.user.id === category.authorId) {
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

module.exports = { userMatchesParam, userOwnsCategory }

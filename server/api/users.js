const router = require('express').Router()
const {User, UserCategory} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'userName', 'highScore']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// for when a user subscribes to a category
router.put('/:userId/categories', async (req, res, next) => {
  try {
    // req.body has a categoryId
    const body = {
      userId: +req.params.userId,
      categoryId: +req.body.categoryId
    }

    const userCategory = await UserCategory.create(body)
    res.json(userCategory)
  } catch (err) { next(err) }
})

// router.delete('/:userId/categories/:categoryId', async (req, res, next) => {
//   try {

//   } catch (err) { next(err) }
// })

const router = require('express').Router()
const {Category, User_Category, User} = require('../db/models')

// GET public categories
router.get('/public', async (req, res, next) => {
  try {
    const publicCategories = await Category.findAll({
      where: {
        public: true
      }
    })
    res.json(publicCategories)
  } catch (err) { next(err) }
})

// GET user's personal categories
router.get('/private/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(+req.params.userId)
    const userCategories = await user.getCategories()
    // if getCategories doesn't work, get all and include the join table and filter...
    res.json(userCategories)
  } catch (err) { next(err) }
})

// GET top scores for a category
router.get('/:categoryId/scores', async (req, res, next) => {
  try {
    const scoreInstances = await User_Category.findAll({
      where: {
        categoryId: +req.params.categoryId
      },
      include: [{ model: User }]
    })

    const topTenScores = scoreInstances.sort((a, b) => {
      if (a.score < b.score) {
        return 1
      } else if (b.score < a.score) {
        return -1
      } else {
        return 0
      }
    }).slice(0, 10)

    res.json(topTenScores)
  } catch (err) { next(err) }
})

module.exports = router

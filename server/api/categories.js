const router = require('express').Router()
const {Category, UserCategory, User, Question} = require('../db/models')

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
    res.json(userCategories.filter(category => !category.public))
  } catch (err) { next(err) }
})

// POST new category
router.post('/', async (req, res, next) => {
  try {
    // req.body must have category name, authorId, and optional public value
    console.log('==*== inside POST request')
    const { userId, category } = req.body
    const categoryBody = {
      ...category,
      authorId: +userId
    }

    console.log('==*== category body', categoryBody)
    const newCategory = await Category.create(categoryBody)
    console.log('==*== after Category.create')

    const userCategory = await UserCategory.create({
      categoryId: newCategory.id,
      userId: +userId
    })
    console.log('==*== after UserCategory.create')

    res.json(newCategory)
  } catch (err) { next(err) }
})

// GET category by id
router.get('/:categoryId', async (req, res, next) => {
  try {
    // want to includ the top scores, right?
    const category = await Category.findById(+req.params.categoryId)
    const questions = await Question.findAll({
      where: {
        categoryId: category.id
      }
    })
    const scores = await UserCategory.findAll({
      where: {
        categoryId: +req.params.categoryId
      }
    })

    const scoresUsers = await Promise.all(scores.map(score => User.findById(score.userId)))

    const scoresObjects = scores.map((score, index) => {
      return {
        userHighScore: score.userHighScore,
        userId: score.userId,
        userName: scoresUsers[index].userName
      }
    })

    const topTenScores = scoresObjects.sort((a, b) => {
      if (a.score < b.score) {
        return 1
      } else if (b.score < a.score) {
        return -1
      } else { return 0 }
    }).slice(0, 10)

    const responseObject = {
      name: category.name,
      id: category.id,
      public: category.public,
      questionTotal: questions.length,
      topScores: topTenScores
    }

    res.json(responseObject)
  } catch (err) { next(err) }
})

module.exports = router

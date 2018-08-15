const User = require('./user')
const Question = require('./question')
const Choice = require('./choice')
const Game = require('./Game')
const Category = require('./category')
const User_Category = require('./user_category')

Choice.belongsTo(Question)
Question.hasMany(Choice)

User.belongsTo(Game)
Game.hasMany(User)

// Category.belongsTo(User, {as: 'author'})
User.belongsToMany(Category, {through: 'users_categories'})
Category.belongsToMany(User, {through: 'users_categories'})

Game.belongsTo(Category)

Question.belongsTo(Category)

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Question,
  Choice,
  Game,
  User_Category,
  Category
}

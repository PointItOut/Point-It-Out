const User = require('./user')
const Question = require('./question')
const Choice = require('./choice')
const Game = require('./Game')
const Category = require('./category')
const UserCategory = require('./user_category')

// foreign key on Choice
Choice.belongsTo(Question)
Question.hasMany(Choice)
// foreign key on User
User.belongsTo(Game)
Game.hasMany(User)
// foreign key on Game
Game.belongsTo(Category, {constraints: false})
Category.hasMany(Game, {constraints: false})
// foreign key on Question
Question.belongsTo(Category)
Category.hasMany(Question)
// foreign 'authorId' key on Category
Category.belongsTo(User, {as: 'author'})
// join table for users subscriptions to categories
User.belongsToMany(Category, {through: { model: 'UserCategory', unique: false}})
Category.belongsToMany(User, {through: { model: 'UserCategory', unique: false}})

module.exports = {
  User,
  Question,
  Choice,
  Game,
  UserCategory,
  Category
}

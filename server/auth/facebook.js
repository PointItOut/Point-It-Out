const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const {User} = require('../db/models')
const router = require('express').Router()
module.exports = router

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'https://point-it-out.herokuapp.com/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log('PROFILE ', profile)
      // const facebookId = profile.id
      // const name = profile.name
      // const email = profile.email
      User.findOrCreate({facebookId: profile.id}, function(err, user) {
        // if (err) {
        //   return cb(err)
        // }
        return cb(err, user)
      })
    }
  )
)
// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/', passport.authenticate('facebook', {scope: 'email'}))

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get(
  '/callback',
  passport.authenticate('facebook', {
    successRedirect: '/home',
    failureRedirect: '/login'
  }),
  function(req, res) {
    res.redirect('/home')
  }
)

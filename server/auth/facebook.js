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
      callbackURL: process.env.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      console.log('PROFILE ', profile)
      const facebookId = profile.id
      const name = profile.name
      const email = profile.email
      User.findOrCreate(
        {
          where: {facebookId},
          defaults: {name, email}
        },
        function(err, user) {
          if (err) {
            return done(err)
          }
          done(null, user)
        }
      )
    }
  )
)
// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/auth/facebook', passport.authenticate('facebook'))

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
)

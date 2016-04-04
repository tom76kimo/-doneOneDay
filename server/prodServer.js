import express from 'express'
import session from 'express-session'
import passport from 'passport'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import path from 'path'

const secret = require('../secret.json')
const app = express()

app.use(session({
  secret: 'tom76kimo'
}))
app.use('/dist', express.static('/'))

app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

passport.use(new FacebookStrategy({
  clientID: '1290594384289716',
  clientSecret: secret.facebookSecret,
  callbackURL: 'http://bible-train.tom76kimo.info/auth/facebook/callback',
  profileFields: ['photos', 'displayName']
}, function (accessToken, refreshToken, profile, done) {
  console.log(profile)
  const userData = {
    id: profile.id,
    name: profile.displayName,
    picture: profile.photos ? profile.photos[0].value : null
  }
  done(null, userData)
}))

app.get('/auth/facebook', passport.authenticate('facebook'))

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }))

app.get('/userData', (req, res) => {
  let userData = req.user
  if (req.user && req.user.id === '10153693132403051') {
    userData = Object.assign({}, userData, {admin: true})
  }
  res.send(200, userData)
})

app.use('/', express.static(path.join(__dirname, '../dist/')))

app.listen(3000, 'localhost', function (err) {
  if (err) {
    console.log(err)
    return
  }

  console.log('Listening at http://localhost:3000')
})

import express from 'express'
import session from 'express-session'
import passport from 'passport'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import path from 'path'

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
  clientSecret: '',
  callbackURL: 'http://bible-train.tom76kimo.info/auth/facebook/callback'
}, function (accessToken, refreshToken, profile, done) {
  const userData = {
    id: profile.id,
    name: profile.displayName
  }
  done(null, userData)
}))

app.get('/auth/facebook', passport.authenticate('facebook'))

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }))

app.get('/userData', (req, res) => {
  res.send(200, req.user)
})

app.use('/', express.static(path.join(__dirname, '../dist/')))

app.listen(3000, 'localhost', function (err) {
  if (err) {
    console.log(err)
    return
  }

  console.log('Listening at http://localhost:3000')
})

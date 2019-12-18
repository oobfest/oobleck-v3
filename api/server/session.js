let expressSession = require('express-session')
let SessionStore = require('../auth/session-store')

let session = expressSession({
  secret: 'keyboard-cat',
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  resave: false,
  saveUninitialized: false,
  store: new SessionStore()
})

module.exports = session

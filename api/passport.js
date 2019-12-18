let passport = require('passport')
let passportLocal = require('passport-local')

let strategyOptions = {usernameField: 'name'}

let login = function(username, password, callback) {
  // TODO
  // get user by username
  // check if passwords are equal

  console.log(username, password)
  console.log(callback)
  return callback()
}

passport.use(new passportLocal.Strategy(strategyOptions, login))

passport.serializeUser(function(user, callback) {
  console.log("Serializing user")
  console.log(user)
  return callback(null, user.id)
})

passport.deserializeUser(function(id, callback) {
  console.log("Decerealizing", id)
  return done(null, {fake: true})
})

module.exports = passport

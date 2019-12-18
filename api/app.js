let express = require('express')
let expressSession = require('express-session')
let SessionStore = require('./auth/session-store')
let entityRouter = require('./entities/router')

let app = express()

// TODO require('helmet')

app.use(express.json())

app.use(expressSession({
  secret: 'keyboard-cat',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false,
  store: new SessionStore()
}))

app.use((request, response, next)=> {

  // TODO Better CORS!
  response.header("Access-Control-Allow-Origin", "http://localhost:8080")
  response.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE")
  response.header("Access-Control-Allow-Credentials", "true")
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

  // fuckin optionzz
  if(request.method == 'OPTIONS') response.end()
  else {
    console.log(request.method, request.path, request.session.authenticated)
    next()
  }
})

app.use(entityRouter)

// Error Route
app.use(function (error, request, response, next) {
  response.statusMessage = error.message
  response.status(500).end()
})

module.exports = app

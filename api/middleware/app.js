let express = require('express')
let helmet = require('helmet')
let session = require('./session')
let cors = require('./cors')
let logger = require('./logger')
let entityRouter = require('../entities/router')
let error = require('./error')

let app = express()

app.disable('x-powered-by')
app.use(cors)
app.use(express.json())
app.use(session)
app.use(logger)
app.use(entityRouter)
app.use(error)

module.exports = app

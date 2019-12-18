let express = require('express')
let session = require('./session')
let cors = require('./cors')
let entityRouter = require('../entities/router')
let error = require('./error')

let app = express()

// TODO require('helmet')
app.use(express.json())
app.use(session)
app.use(cors)
app.use(entityRouter)
app.use(error)

module.exports = app

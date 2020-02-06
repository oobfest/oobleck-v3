let express = require('express')
let controller = require('./controller')
let publicRouter = new express.Router()

publicRouter.get('/', controller.getPublic)

module.exports = publicRouter

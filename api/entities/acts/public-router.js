let express = require('express')
let publicRouter = new express.Router()
let controller = require('./controller')

publicRouter.post('/', controller.create)

module.exports = publicRouter

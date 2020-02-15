let express = require('express')
let publicRouter = new express.Router()
let controller = require('./controller')

publicRouter.post('/', controller.create)
publicRouter.post('/mark-payment', controller.markPayment)

module.exports = publicRouter

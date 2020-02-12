let express = require('express')
let controller = require('./controller')
let publicRouter = new express.Router()

publicRouter.post('/', controller.checkPromoCode)

module.exports = publicRouter

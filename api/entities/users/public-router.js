let express = require('express')
let controller = require('./controller')
let publicRouter = new express.Router()

publicRouter.post('/login', controller.login)
publicRouter.get('/logout', controller.logout)
publicRouter.post('/reset-password', controller.resetPassword)

module.exports = publicRouter
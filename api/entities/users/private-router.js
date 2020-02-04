let express = require('express')
let privateRouter = new express.Router()
let controller = require('./controller')
let checkAuthentication = require('../../auth/check-authentication')
let checkAuthorization = require('../../auth/check-authorization')

privateRouter.use(checkAuthentication)

privateRouter.get('/', controller.get)
privateRouter.post('/', controller.create)
privateRouter.post('/unique', controller.unique)
privateRouter.get('/check', controller.check)
privateRouter.get('/:id', controller.get)
privateRouter.put('/:id', controller.update)
privateRouter.delete('/:id', controller.delete)

module.exports = privateRouter
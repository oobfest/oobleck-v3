let express = require('express')
let router = new express.Router()
let controller = require('./controller')
let checkAuthentication = require('../../auth/check-authentication')

router.get('/', checkAuthentication, controller.get)
router.post('/', checkAuthentication, controller.create)
router.post('/login', controller.login)
router.get('/check', checkAuthentication, controller.check)
router.get('/logout', controller.logout)

module.exports = router

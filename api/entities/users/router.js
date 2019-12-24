let express = require('express')
let router = new express.Router()
let controller = require('./controller')
let checkAuthentication = require('../../auth/check-authentication')

router.route('/')
  .get(checkAuthentication, controller.get)
  .post(checkAuthentication, controller.create)

router.post('/unique', checkAuthentication, controller.unique)
router.post('/login', controller.login)
router.post('/reset-password', controller.resetPassword)
router.get('/check', checkAuthentication, controller.check)
router.get('/logout', controller.logout)

router.route('/:id')
  .delete(checkAuthentication, controller.delete)

module.exports = router

let express = require('express')
let router = new express.Router()
let controller = require('./controller')
let checkAuthentication = require('../../auth/check-authentication')

router.route('/')
  .get(checkAuthentication, controller.get)
  .post(checkAuthentication, controller.create)

router.route('/:id')
  .delete(checkAuthentication, controller.delete)

router.post('/login', controller.login)
router.get('/check', checkAuthentication, controller.check)
router.get('/logout', controller.logout)

module.exports = router

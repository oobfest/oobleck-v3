let express = require('express')
let controller = require('./controller')
let router = new express.Router()

let checkAuthentication = require('../../auth/check-authentication')
let checkAuthorization = require('../../auth/check-authorization')

router.route('/', checkAuthentication, checkAuthorization(['admin', 'staff']))
  .get(controller.get)
  .post(controller.create)

router.route('/public')
  .get(controller.getPublic)

router.route('/:id', checkAuthentication, checkAuthorization(['admin', 'staff']))
  .get(controller.get)
  .put(controller.update)
  .delete(controller.delete)

module.exports = router

let express = require('express')
let controller = require('./controller')
let checkAuthentication = require('../../auth/check-authentication')
let checkAuthorization = require('../../auth/check-authorization')
let router = new express.Router()

router.use(checkAuthentication, checkAuthorization(null))

router.route('/')
  .get(controller.get)
  .post(controller.create)

router.route('/review')
  .get(controller.review)

router.route('/review-standup')
  .get(controller.reviewStandup)

router.route('/review/:slug/:userId')
  .get(controller.review)

router.route('/:id')
  .get(controller.get)
  .put(controller.update)
  .delete(controller.delete)

module.exports = router

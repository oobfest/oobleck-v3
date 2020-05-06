let express = require('express')
let controller = require('./controller')
let createPrivateRouter = require('../create-private-router')
let router = new express.Router()

router.route('/get-user-reviews')
  .get(controller.getUserReviews)

module.exports = createPrivateRouter(router, controller)

let checkAuthentication = require('../auth/check-authentication')

let createRouter = function(router, controller) {
  router.use(checkAuthentication)

  router.route('/')
    .get(controller.get)
    .post(controller.create)

  router.route('/:id')
    .get(controller.get)
    .put(controller.update)
    .delete(controller.delete)

  return router
}

module.exports = createRouter

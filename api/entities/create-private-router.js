let checkAuthentication = require('../auth/check-authentication')
let checkAuthorization = require('../auth/check-authorization')

let createPrivateRouter = function(router, controller, roles=null) {
  router.use(checkAuthentication, checkAuthorization(roles))

  router.route('/')
    .get(controller.get)
    .post(controller.create)

  router.route('/:id')
    .get(controller.get)
    .put(controller.update)
    .delete(controller.delete)

  return router
}

module.exports = createPrivateRouter
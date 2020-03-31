let createController = function(model, overrides={}) {
  let defaults = {
    create(request, response) {
      response.json(model.create(request.body))
    },
    get(request, response) {
      response.json(model.get(request.params.id))
    },
    getPublic(request, response) {
      response.json(model.getPublic())
    },
    update(request, response) {
      response.json(model.update(request.params.id, request.body))
    },
    delete(request, response) {
      response.json(model.delete(request.params.id))
    }
  }
  return { ...defaults, ...overrides }
}

module.exports = createController

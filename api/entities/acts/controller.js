let model = require('./model')
let createController = require('../create-controller')

overrides = {
  async create(request, response) {
    response.json(await model.create(request.body))
  },
  review(request, response) {
    response.json(model.getForReview(request.params.slug))
  },
  reviewStandup(request, response) {
    response.json(model.getForStandupReview())
  }
}

module.exports = createController(model, overrides)

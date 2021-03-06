let model = require('./model')
let createController = require('../create-controller')

let overrides = {
  get(request, response) {
    let id = request.query.id
    let userId = request.query.userId
    response.json(model.get(id, userId))
  },
  getUserReviews(request, response) {
    response.json(model.getUserReviews())
  }
}

module.exports = createController(model, overrides)

let model = require('./model')
let createController = require('../create-controller')

overrides = {
  getPublic(request, response) {
    response.json(model.getPublic())
  }
}

module.exports = createController(model, overrides)

let model = require('./model')
let createController = require('../create-controller')

let overrides = {
  async create(request, response, next) {
    try {
      let data = await model.create(request.body)
      response.json(data)
    }
    catch(error) {
      next(error)
    }
  },
  async unique(request, response, next) {
    try {
      response.json(model.unique(request.body.email))
    }
    catch(error) {
      next(error)
    }
  },
  async login(request, response, next) {
    try {
      let user = await model.login(request.body)
      if(!user) throw new Error("Authentication failed")
      request.session.authenticated = true
      response.json(user)
    }
    catch(error) {
      next(error)
    }
  },
  check(request, response, next) {
    response.end()
  },
  logout(request, response, next) {
    request.session.destroy(error=> {
      if(error) next(error)
      else {
        response.clearCookie()
        response.json({success: true})
      }
    })
  },
  async resetPassword(request, response, next) {
    try {
      let email = request.body.email
      let result = await model.resetPassword(email)
      response.json(result)
    }
    catch(error) {
      next(error)
    }
  }
}

module.exports = createController(model, overrides)

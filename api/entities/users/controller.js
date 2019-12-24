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
      let authenticated = await model.login(request.body)
      if(!authenticated) throw new Error("Authentication failed")
      request.session.authenticated = authenticated
      let role = await model.getRole(request.body.email)
      request.session.role = role.role
      response.json({role: request.session.role})
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

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
  async login(request, response, next) {
    try {
      let authenticated = await model.login(request.body)
      if(!authenticated) throw new Error("Authentication failed")
      request.session.authenticated = authenticated
      response.json({ok: true})
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
        response.json({ok: true})
      }
    })
  }
}

module.exports = createController(model, overrides)

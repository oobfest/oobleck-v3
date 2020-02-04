let express = require('express')
let publicRouter = new express.Router()

publicRouter.get('/', (request, response)=> {
  response.json({ok: true})
})

module.exports = publicRouter

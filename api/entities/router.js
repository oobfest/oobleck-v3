let express = require('express')
let privateRouter = new express.Router()
let publicRouter = new express.Router()
let fs = require('fs')

// Create private & public routes for each directory found in './entities'
fs.readdirSync('./entities', { withFileTypes: true })
  .filter(file=> file.isDirectory())
  .map(directory=> {
    let entity = directory.name 
    let entityPrivateRouter = require(`./${entity}/private-router`)
    privateRouter.use(`/${entity}`, entityPrivateRouter)

    let entityPublicRouter = require(`./${entity}/public-router`)
    publicRouter.use(`/${entity}`, entityPublicRouter)
  })

// Combine private & public routers into one main router
let mainRouter = new express.Router()

mainRouter.use('/private', privateRouter)
mainRouter.use('/public', publicRouter)

module.exports = mainRouter

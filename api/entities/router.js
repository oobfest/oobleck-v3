let express = require('express')
let router = new express.Router()
let fs = require('fs')

// Create a router for each directory found in './entities'
fs.readdirSync('./entities', {withFileTypes:true})
  .filter(file=> file.isDirectory())
  .map(d=> router.use(`/${d.name}`, require(`./${d.name}/router`)))

module.exports = router

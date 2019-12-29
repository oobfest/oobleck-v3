let schema = require('./schema')
let createModel = require('../create-model')

// TODO
// When attempting to delete a venue, first check for all associated stages

// select stage.name from venue
// join stage on venue.id == stage.venueId
// where stage.id == ?

module.exports = createModel(schema)

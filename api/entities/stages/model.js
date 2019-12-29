let schema = require('./schema')
let createModel = require('../create-model')
let database = require('../../database')

let overrides = {
  get(id=null) {
    if(id) throw new Error("Not implemented yet")
    else return database
      .prepare(`
        select stage.id as id, stage.name as name, venue.name as venue
        from stage
        join venue on stage.venueId == venue.id`)
      .all()
  }
}

module.exports = createModel(schema, overrides)

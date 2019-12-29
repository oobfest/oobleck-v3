let schema = require('./schema')
let createModel = require('../create-model')
let database = require('../../database')

let overrides = {
  get(id=null) {
    if(id) throw new Error("Not implemented")
    else return database
      .prepare(`select id, name, timestamp from day order by timestamp`)
      .all()
  }
}

module.exports = createModel(schema, overrides)

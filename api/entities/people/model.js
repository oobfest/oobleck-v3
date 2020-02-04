let schema = require('./schema')
let createModel = require('../create-model')
let database = require('../../database')

let overrides = {
  get() {
    return database
      .prepare(`
        select id, name, bio, email, phone, imageUrl, imageDeleteUrl, hide
        from person
        order by name`)
      .all()
  },
  getPublic() {
    return database
      .prepare(`
        select id, name, bio, imageUrl
        from person
        where hide = FALSE
        order by name`)
      .all()
  }
}
module.exports = createModel(schema, overrides)

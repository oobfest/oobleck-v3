let schema = require('./schema')
let createModel = require('../create-model')
let database = require('../../database')

let overrides = {
  create(show) {
    let response = database
      .prepare(`
        insert into show (timestamp, duration, name, dayId, stageId)
        values (?, ?, ?, ?, ?)`)
      .run(show.timestamp, show.duration, show.name, show.dayId, show.stageId)
    return this.getById(response.lastInsertRowid)
  },
  get() {
    return database
      .prepare(`
        select show.id, show.name, show.duration, show.timestamp, stage.name as stage, day.name as day
        from show
        join stage on show.stageId == stage.id
        join day on show.dayId == day.id`)
      .all()
  },
  getById(id) {
    return database
      .prepare(`
        select show.name, show.duration, show.timestamp, stage.name as stage, day.name as day
        from show
        join stage on show.stageId == stage.id
        join day on show.dayId == day.id
        where show.id == ?`)
      .get(id)
  }
}

module.exports = createModel(schema, overrides)

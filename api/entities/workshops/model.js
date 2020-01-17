let schema = require('./schema')
let createModel = require('../create-model')

let overrides = {
  create(workshop) {
    console.log(workshop)
    // Create Workshop
    let response = database
      .prepare(`
        insert into workshop (name, description, price, auditPrice, capacity, auditCapactiy)
        values (?, ?, ?, ?, ?, ?)`)
      .run(workshop.name, workshop.description, workshop.price, workshop.auditPrice, workshop.capacity, workshop.auditCapacity)

    // Associate workshop with each instructor
    for(let instructor of workshop.instructors) {
      database
        .prepare(`
          insert into workshop_to_person (workshopId, personId)
          values (?, ?)`)
        .run(response.lastInsertRowid, instructor.id)
    }
    return response
  }
}

module.exports = createModel(schema, overrides)

let schema = require('./schema')
let createModel = require('../create-model')
let database = require('../../database')
let slugGen = require('slug-gen')

let overrides = {
  create(workshop) {
    // Create Workshop
    let slug = slugGen.slug(workshop.name) // Generate Slug for URLs
    let response = database
      .prepare(`
        insert into workshop (name, slug, description, price, auditPrice, capacity, auditCapacity)
        values (?, ?, ?, ?, ?, ?, ?)`)
      .run(workshop.name, slug, workshop.description, workshop.price, workshop.auditPrice, workshop.capacity, workshop.auditCapacity)

    // Associate workshop with each instructor
    let newInstructors = []
    for(let instructor of workshop.instructors) {
      newInstructors.push(database
        .prepare(`
          insert into workshop_to_person (workshopId, personId)
          values (?, ?)`)
        .run(response.lastInsertRowid, instructor.id))
    }
    return response
  },

  get() {
    return database
      .prepare(`
        select
          workshop.id, workshop.name, workshop.slug, workshop.description, workshop.price, workshop.auditPrice, workshop.capacity, workshop.auditCapacity
        from workshop`)
      .all()
      .map(workshop=> {
        workshop.instructors = database
          .prepare(`
            select person.id, person.name, person.bio
            from workshop_to_person
            join person on workshop_to_person.personId == person.id
            where workshop_to_person.workshopId == ?
          `)
          .all(workshop.id)
        return workshop
      })
  },

  getById(id) {
    // Get Workshop
    let workshop = database
      .prepare(`
        select 
          id, name, slug, description, price, auditPrice, capacity, auditCapacity
        from workshop
        where id ==  ?`)
      .get(id)

    // Get instructors for workshop
    workshop.instructors = database
      .prepare(`
        select person.id, person.name, person.bio
        from workshop_to_person
        join person on workshop_to_person.personId == person.id
        where workshop_to_person.workshopId == ?`)
      .all(workshop.id)

    return workshop
  }
}

module.exports = createModel(schema, overrides)

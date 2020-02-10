let schema = require('./schema')
let createModel = require('../create-model')
let database = require('../../database')

let overrides = {
  get(id=null) {
    if(id) {
      let person = database
        .prepare(`
          select id, name, bio, email, phone, imageUrl, imageDeleteUrl, isHidden, isConfirmed
          from person
          where id = ?`)
        .get(id)
      let acts = database
        .prepare(`
          select act.id, act.name, act.slug
          from act
          join act_to_person
          on act_to_person.actId = act.id
          where act_to_person.personId = ?`)
        .all(person.id)
      let workshops = database
        .prepare(`
          select workshop.id, workshop.name, workshop.slug
          from workshop
          join workshop_to_person
          on workshop_to_person.workshopId = workshop.id
          where workshop_to_person.personId = ?`)
        .all(person.id)
      return {...person, acts, workshops}
    }
    else return database
      .prepare(`
        select id, name, bio, email, phone, imageUrl, imageDeleteUrl, isHidden, isConfirmed
        from person
        order by name`)
      .all()
  },
  getPublic() {
    return database
      .prepare(`
        select id, name, bio, imageUrl
        from person
        where isHidden = FALSE
        order by name`)
      .all()
  }
}
module.exports = createModel(schema, overrides)

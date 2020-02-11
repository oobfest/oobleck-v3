let { slug } = require('slug-gen')
let schema = require('./schema')
let database = require('../../database')
let createModel = require('../create-model')

let overrides = {
  get(slug=null) {
    if(slug) {
      let act = database
        .prepare(`
          select act.id, act.name, act.associatedTheater, act.city, act.stateOrProvince, act.country 
          from act 
          where slug = ?`)
        .get(slug)
      let people = database
        .prepare(`
          select person.id, person.name, act_role.name as 'role'
          from person
          join act_to_person
          on act_to_person.personId = person.id
          join act_role
          on act_to_person.actRoleId = act_role.id
          where act_to_person.actId = ?`)
        .all(act.id)
      return {...act, people}
    }
    else {
      let acts = database
        .prepare(`
          select * 
          from act 
          order by name`)
        .all()

      return acts.map(act=> {
        return {
          ...act, 
          actTypes: database
            .prepare(`
              select act_type.name 
              from act_to_act_type
              join act_type
              on act_to_act_type.actTypeId = act_type.id
              where act_to_act_type.actId = ?`)
            .all(act.id)
            .map(act=> act.name)
          }
        })
    }
  },

  create(data) {

    // act table
    let newActRow = {
      slug: slug(data.name),
      creationDate: Date.now(),
      ...data,
      isHeadliner: 0,
      isPaid: 0,
      isAccepted: 0,
      isConfirmed: 0,
      isLocal: data.isLocal ? 1 : 0
    }

    let result = database
      .prepare(`
        insert into act (
          name, 
          slug, 
          creationDate, 
          showTitle, 
          country, 
          stateOrProvince, 
          city, 
          associatedTheater, 

          publicDescription, 
          privateDescription, 
          accolades, 

          imageUrl, 
          imageDeleteUrl, 

          videoUrl1, 
          videoUrl2, 
          videoInformation, 

          techNeeds, 
          maximumTime, 
          minimumTime, 

          contactName, 
          contactPhone, 
          contactEmail, 
          contactRoleId, 

          isHeadliner, 
          isLocal, 
          isPaid, 
          isAccepted, 
          isConfirmed
        )
        values (
          @name, 
          @slug, 
          @creationDate, 
          @showTitle, 
          @country, 
          @stateOrProvince, 
          @city, 
          @associatedTheater, 


          @publicDescription, 
          @privateDescription, 
          @accolades, 

          @imageUrl, 
          @imageDeleteUrl, 

          @videoUrl1, 
          @videoUrl2, 
          @videoInformation, 

          @techNeeds, 
          @maximumTime, 
          @minimumTime, 

          @contactName, 
          @contactPhone, 
          @contactEmail, 
          @contactRoleId, 

          @isHeadliner, 
          @isLocal, 
          @isPaid, 
          @isAccepted, 
          @isConfirmed)`)
      .run(newActRow)

    // Get new act
    let act = database
      .prepare(`select * from act where rowid = ?`)
      .get(result.lastInsertRowid)

    // act_availability
    let createActAvailability = database.prepare(`insert into act_availability (actId, dayId) values (?, ?)`)
    data.availability.map(dayId=> createActAvailability.run(act.id, dayId))

    // act_to_act_type
    let createActToActType = database.prepare(`insert into act_to_act_type (actId, actTypeId) values (?, ?)`)
    data.actTypes.map(actTypeId=> createActToActType.run(act.id, actTypeId))

    // Create new people
    let emails = database.prepare(`select email from person`).all().map(p=>p.email)
    let createPerson = database.prepare(`insert into person (name, email, isConfirmed) values (?, ?, FALSE)`)
    data.people.map(person=> {
      if (!emails.includes(person.email)) createPerson.run(person.name, person.email)
    })

   // act_to_person
    let createActToPerson = database.prepare(`insert into act_to_person (actId, personId, actRoleId) values (?, ?, ?)`)
    let people = database.prepare(`select * from person`).all()
    data.people.map(person=> {
      let newPerson = people.find(p=> p.email == person.email)
      createActToPerson.run(act.id, newPerson.id, person.roleId)
    })

    // TODO: Social Media

    return act
  }
}

module.exports = createModel(schema, overrides)

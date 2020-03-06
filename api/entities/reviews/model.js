let schema = require('./schema')
let createModel = require('../create-model')
let database = require('../../database')

overrides = {
  get(id=null, userId=null) {
    if(id) {
      if(userId) {
        return database
          .prepare(`
            select * from review 
            where id = ? and userId = ?`)
          .get(id, userId)
      }
      else {
        return database
          .prepare(`select * from review where id = ?`)
          .get(id)
      }
    }
    else {
      return database
        .prepare(`
          select review.score, review.notes, act.name as actName, user.name as userName
          from review
          join act on review.actId = act.id
          join user on review.userId = user.id`
        )
        .all()
    }
  },
  create(review) {
     return database
      .prepare(`
        insert into review(score, notes, actId, userId)
        values (@score, @notes, @actId, @userId)
        on conflict(actId, userId) do update
        set score=@score, notes=@notes`)
      .run(review)
  }
}

module.exports = createModel(schema, overrides)

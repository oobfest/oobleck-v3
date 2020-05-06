let schema = require('./schema')
let database = require('./database')
let createModel = require('../create-model')

overrides = {
  get(id=null, userId=null) {
    if(id && userId)    return database.getReviewByIdAndUserId.get(id, userId)
    else if (id)        return database.getReviewById.get(id)
    else if (userId)    return database.getReviewsByUserId.all(userId)
    else 
      return database.getActs
        .all()
        .map(a=> { return { reviews: database.getReviewsByActId.all(a.id), ...a }})
  },
  create(review) {
    return database.createReview.run(review)
  },
  getUserReviews() {
    return database.getUsers
      .all()
      .map(u=> { return { reviews: database.getReviewsByUserId.all(u.id), ...u } })
  }
}

module.exports = createModel(schema, overrides)

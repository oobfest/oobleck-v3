let schema = require('./schema')
let database = require('./database')
let createModel = require('../create-model')

overrides = {
  get(id=null, userId=null) {
    console.log(id, userId)
    if(id && userId)    return database.getReviewByIdAndUserId.get(id, userId)
    else if (id)        return database.getReviewById.get(id)
    else if (userId)    return database.getReviewsByUserId.all(userId)
    else                return database.getReviews.all()
  },
  create(review) {
    return database.createReview.run(review)
  }
}

module.exports = createModel(schema, overrides)

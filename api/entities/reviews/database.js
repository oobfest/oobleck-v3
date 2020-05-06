let database = require('../../database')

let queries = {
  createReview: database.prepare(`
    insert into review(score, notes, actId, userId)
    values (@score, @notes, @actId, @userId)
    on conflict(actId, userId) do update
    set score=@score, notes=@notes`),

  getReviewByIdAndUserId: database.prepare(`
    select id, actId, userId, score, notes
    from review
    where id=? and userId=?`),
  
  getReviewById: database.prepare(`
    select id, actId, userId, score, notes
    from review
    where id=?`),

  getReviewsByUserId: database.prepare(`
    select review.actId, review.score, review.notes
    from review
    join act on act.id = review.actId
    where userId=?`),

  getActs: database.prepare(`
    select name, id
    from act
    where isPaid = true`),

  getUsers: database.prepare(`
    select user.name as userName, user.id, user_role.name as role
    from user
    join user_role on user.roleId = user_role.id`),

  getReviewsByActId: database.prepare(`
    select review.score, review.notes, user.name as reviewer
    from review
    join user on review.userId = user.id
    where review.actId = ?`),

  getReviews: database.prepare(`
    select 
      review.score, review.notes, 
      act.name as actName, 
      user.name as userName
    from review
    join act on review.actId = act.id
    join user on review.userId = user.id`)
}

module.exports = queries

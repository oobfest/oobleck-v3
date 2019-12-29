let express = require('express')
let router = new express.Router()

let catRouter = require('./cats/router')
let dayRouter = require('./days/router')
let roleRouter = require('./roles/router')
let stageRouter = require('./stages/router')
let userRouter = require('./users/router')
let venueRouter = require('./venues/router')

router.use('/cats', catRouter)
router.use('/days', dayRouter)
router.use('/roles', roleRouter)
router.use('/stages', stageRouter)
router.use('/users', userRouter)
router.use('/venues', venueRouter)

module.exports = router

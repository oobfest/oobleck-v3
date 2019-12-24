let express = require('express')
let router = new express.Router()

let catRouter = require('./cats/router')
let roleRouter = require('./roles/router')
let userRouter = require('./users/router')

router.use('/cats', catRouter)
router.use('/roles', roleRouter)
router.use('/users', userRouter)

module.exports = router

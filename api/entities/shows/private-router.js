let express = require('express')
let router = new express.Router()
let controller = require('./controller')
let createPrivateRouter = require('../create-private-router')

module.exports = createPrivateRouter(router, controller)
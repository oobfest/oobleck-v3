let express = require('express')
let controller = require('./controller')
let createPrivateRouter = require('../create-private-router')
let router = new express.Router()

module.exports = createPrivateRouter(router, controller)
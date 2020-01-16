let express = require('express')
let router = new express.Router()
let controller = require('./controller')

let createRouter = require('../create-router')

module.exports = createRouter(router, controller, ['admin'])

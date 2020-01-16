let schema = require('./schema')
let createModel = require('../create-model')
let database = require('../../database')

module.exports = createModel(schema)

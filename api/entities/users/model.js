let database = require('../../database')
let schema = require('./schema')
let createModel = require('../create-model')
let argon2 = require('argon2')

let overrides = {
  get() {
    return database
      .prepare(`select name from user`)
      .all()
  },
  async create(user) {
    let hash = await argon2.hash(user.password)
    return database
      .prepare(`insert into user (name, password) values (?, ?)`)
      .run([user.name, hash])
  },
  async login(login) {
    let user = database
      .prepare(`select * from user where name = ?`)
      .get(login.name)
    if(!user) throw new Error("User not found")
    return await argon2.verify(user.password, login.password)
  }
}


module.exports = createModel(schema, overrides)

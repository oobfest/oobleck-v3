let database = require('../../database')
let schema = require('./schema')
let createModel = require('../create-model')

let passwordGenerator = require('otp-generator')
let argon2 = require('argon2')

let overrides = {
  get() {
    return database
      .prepare(`select id, name from user`)
      .all()
  },
  async create(user) {
    if(!user.password) {
      user.password = passwordGenerator.generate(12, {specialChars: false})
      console.log(user.password)
    }
    let hash = await argon2.hash(user.password)
    let response = database
      .prepare(`insert into user (name, password) values (?, ?)`)
      .run([user.name, hash])
    return database
      .prepare(`select id, name from user where id = ?`)
      .get(response.lastInsertRowid)
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

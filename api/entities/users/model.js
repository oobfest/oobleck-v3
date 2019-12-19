let database = require('../../database')
let schema = require('./schema')
let createModel = require('../create-model')

let passwordGenerator = require('otp-generator')
let argon2 = require('argon2')
let sendEmail = require('../../email/send-email')

let overrides = {
  get() {
    return database
      .prepare(`select id, email from user`)
      .all()
  },
  unique(email) {
    let result = database
      .prepare(`select count(*) as count from user where email = ?`)
      .get(email)
    return {unique: result.count == 0}
  },
  async create(user) {
    if(!user.password) {
      user.password = passwordGenerator.generate(12, {specialChars: false})
      console.log(user.password)
    }
    let hash = await argon2.hash(user.password)
    let response = database
      .prepare(`insert into user (email, password) values (?, ?)`)
      .run([user.email, hash])
    sendEmail(user.email, 'Ooba Leaf Login', "It's here! " + user.password)
    return database
      .prepare(`select id, email from user where id = ?`)
      .get(response.lastInsertRowid)
  },
  async login(login) {
    let user = database
      .prepare(`select * from user where email = ?`)
      .get(login.email)
    if(!user) throw new Error("User not found")
    return await argon2.verify(user.password, login.password)
  }
}

module.exports = createModel(schema, overrides)

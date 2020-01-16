let database = require('../../database')
let schema = require('./schema')
let createModel = require('../create-model')

let passwordGenerator = require('otp-generator')
let argon2 = require('argon2')
let sendEmail = require('../../email/send-email')

let overrides = {
  get() {
    return database
      .prepare(`
        select user.id, user.email, user_role.name AS role
        from user
        join user_role on user.roleId == user_role.id`)
      .all()
  },
  getById(id) {
    return database
      .prepare(`
        select user.id, user.email, user_role.name AS role
        from user
        join user_role on user.roleId == user_role.id
        where user.id = ?`)
      .get(id)
  },
  getRole(userEmail) {
    return database
      .prepare(`
        select user_role.name AS role
        from user
        join user_role on user.roleId == user_role.id
        where user.email = ?`)
      .get(userEmail)
  },
  unique(email) {
    let result = database
      .prepare(`select count(*) as count from user where email = ?`)
      .get(email)
    return {unique: result.count == 0}
  },
  async create(user) {
    if(!user.password) user.password = passwordGenerator.generate(12, {specialChars: false})
    console.log(user.password)
    let hash = await argon2.hash(user.password)
    let response = database
      .prepare(`insert into user (email, password, roleId) values (?, ?, ?)`)
      .run([user.email, hash, user.roleId])
    if(user.sendEmail) sendEmail(user.email, 'OoBleck Login', "It's here! " + user.password)
    return this.getById(response.lastInsertRowid)
  },
  async login(login) {
    let user = database
      .prepare(`select email, password from user where email = ?`)
      .get(login.email)
    if(!user) throw new Error("User not found")
    else if(await argon2.verify(user.password, login.password)) return this.getRole(user.email)
    else throw new Error("Login failed")
  },
  async resetPassword(email) {
    let newPassword = passwordGenerator.generate(12, {specialChars: false})
    let hash = await argon2.hash(newPassword)
    let result = database
      .prepare(`update user set password = ? where email = ?`)
      .run([hash, email])
    if(result.changes==1) sendEmail(email, 'Reset password', `New: ${newPassword}`)
    return { success: true }
  }
}

module.exports = createModel(schema, overrides)

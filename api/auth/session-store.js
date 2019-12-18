let expressSession = require('express-session')
let events = require('events')

let removeExpiredSessions = function(database) {
  return database
    .prepare(`DELETE FROM session WHERE ? > expires`)
    .run(new Date().getTime())
}

let database = require('../database')
let SessionStore = function() {
  this.client = new events.EventEmitter()
  this.database = database

  this.database
    .prepare(`CREATE TABLE IF NOT EXISTS session (sessionId PRIMARY KEY, expires, token)`)
    .run()

  this.client.emit('connect')
  removeExpiredSessions(database)
}

// Inherit from Store
SessionStore.prototype = Object.create(expressSession.Store.prototype)
SessionStore.prototype.constructor = SessionStore

SessionStore.prototype.get = function(sessionId, callback) {
  try {
    let now = new Date().getTime()
    let session = this.database
      .prepare(`SELECT token FROM session WHERE sessionId = ? AND ? <= expires`)
      .get(sessionId, now)
    if(!session) callback(null, null)
    else {
      callback(null, JSON.parse(session.token))
    }
  }
  catch(error) {
    callback(error)
  }
}

SessionStore.prototype.set = function(sessionId, session, callback) {
  try {
    let expires = new Date().getTime() + session.cookie.maxAge

    this.database
      .prepare(`INSERT OR REPLACE INTO session VALUES (?, ?, ?)`)
      .run(sessionId, expires, JSON.stringify(session))
  }
  catch(error) {
    console.log(error)
  }
  callback()
}

SessionStore.prototype.destroy = function(sessionId, callback) {
  try {
    this.database
      .prepare(`DELETE FROM session WHERE sessionId = ?`)
      .run(sessionId)
    callback(null)
  }
  catch(error) {
    callback(error)
  }
}

SessionStore.prototype.touch = function(sessionId, session, callback) {
  try {
    if(session && session.cookie && session.cookie.expires) {
      let now = new Date().getTime()
      let cookieExpires = new Date(session.cookie.expires).getTime()
      this.database
        .prepare('UPDATE session SET expires=? WHERE sessionId = ? AND ? <= expires')
          .run(cookieExpires, sessionId, now)
      callback(null)
    }
  }
  catch(error) {
    throw new Error("TOUCH FAIL!")
    callback(error)
  }
}

module.exports = SessionStore

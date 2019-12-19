let sqlite = require('better-sqlite3')
let database = new sqlite('database.db', { memory: true})

database.pragma('journal_mode = WAL')
database.exec(`
  CREATE TABLE IF NOT EXISTS 
  user (email TEXT UNIQUE, password TEXT, id INTEGER PRIMARY KEY AUTOINCREMENT);`)

database.exec(`
  CREATE TABLE IF NOT EXISTS 
  cat (name TEXT, isFluffy NUMBER, id INTEGER PRIMARY KEY AUTOINCREMENT);`)

database.exec(`
  INSERT INTO cat (name, isFluffy) 
  VALUES ("Wilbur", FALSE), ("Fern", FALSE);`)

// Fake user!
let argon2 = require('argon2')
argon2
  .hash('cat')
  .then(hash=> {
    database.exec(`
      INSERT INTO user (email, password)
      VALUES ("car", "${hash}")`)
  })

module.exports = database

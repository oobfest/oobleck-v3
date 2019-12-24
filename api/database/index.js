let sqlite = require('better-sqlite3')
let database = new sqlite('database.db', { memory: true } )

database.pragma('journal_mode = WAL')
database.exec(`
  CREATE TABLE IF NOT EXISTS 
  user (email TEXT UNIQUE, password TEXT, roleId INTEGER, id INTEGER PRIMARY KEY AUTOINCREMENT);`)

database.exec(`
  CREATE TABLE IF NOT EXISTS 
  role (name TEXT UNIQUE, id INTEGER PRIMARY KEY AUTOINCREMENT);`)

database.exec(`
  INSERT INTO role (name)
  VALUES ("admin"), ("staff"), ("panelist");`)

database.exec(`
  CREATE TABLE IF NOT EXISTS 
  cat (name TEXT, isFluffy BOOLEAN, id INTEGER PRIMARY KEY AUTOINCREMENT);`)

database.exec(`
  INSERT INTO cat (name, isFluffy) 
  VALUES ("Wilbur", FALSE), ("Fern", FALSE);`)

// Fake user!
let argon2 = require('argon2')
argon2
  .hash('cat')
  .then(hash=> {
    database.exec(`
      INSERT INTO user (email, password, roleId)
      VALUES 
        ("car", "${hash}", 1), 
        ("car2", "${hash}", 2),
        ("car3", "${hash}", 3)`)
  })

module.exports = database

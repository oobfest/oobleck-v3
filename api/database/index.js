let fs = require('fs')
let sqlite = require('better-sqlite3')
let database = new sqlite('database.db', { memory: true } )

database.pragma('foreign_keys = ON;')
database.pragma('journal_mode = WAL;')

// Execute all the scripts in the './database/tables' directory
fs.readdirSync('./database/tables')
  .map(sql=> {
    let sqlScript = fs.readFileSync('./database/tables/' + sql, 'utf8')
    database.exec(sqlScript)
  })

// Populate the database with some values
let testData = fs.readFileSync('./database/seed.sql', 'utf8')
database.exec(testData)

// Fake users!
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

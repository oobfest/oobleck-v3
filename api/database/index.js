let fs = require('fs')
let sqlite = require('better-sqlite3')
let database = new sqlite('database.db', { memory: true } )

database.pragma('foreign_keys = ON;')
database.pragma('journal_mode = WAL;')

let scripts = [
  './database/tables/user.sql',
  './database/tables/day.sql',
  './database/tables/venue.sql',
  './database/tables/stage.sql',
  './database/tables/act_type.sql',
  './database/tables/act_role.sql',
  './database/tables/social_media.sql',
  './database/seed.sql',
]

for(let script of scripts) {
  database.exec(fs.readFileSync(script, 'utf8'))
}

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

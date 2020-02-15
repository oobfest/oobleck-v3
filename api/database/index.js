let sqlite = require('better-sqlite3')
let database = new sqlite('database.db')

database.pragma('foreign_keys = ON;')
database.pragma('journal_mode = WAL;')

module.exports = database

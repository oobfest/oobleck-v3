require('./environment-variables')
let fs = require('fs')
let database = require('./database')

// Execute all the scripts in the './database/tables' directory
fs.readdirSync('./database/tables')
  .map(sql=> {
    let sqlScript = fs.readFileSync('./database/tables/' + sql, 'utf8')
    process.stdout.write(`Creating table ${sql}... `)
    database.exec(sqlScript)
    process.stdout.write("✔ \n")
  })

// Fill test data

process.stdout.write(`Creating test data... `)
let testData = fs.readFileSync('./database/seed.sql', 'utf8')
database.exec(testData)
process.stdout.write("✔ \n")

// Admin user
process.stdout.write(`Creating admin user... `)
let argon2 = require('argon2')
argon2
  .hash(process.env.ADMIN_PASSWORD)
  .then(hash=> {
    database.exec(`
      INSERT INTO user (name, email, password, roleId)
      VALUES ('Ooby', "${process.env.ADMIN_USERNAME}", "${hash}", 1)`
    )
    process.stdout.write(`✔ \n`)
  })


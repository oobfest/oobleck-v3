let dotenv = require('dotenv').config()

let expectedEnvironmentVariables = ['PORT', 'SESSION_SECRET', 'PROMO_CODE']
for(expectedEnvironmentVariable of expectedEnvironmentVariables) {
  if(process.env[expectedEnvironmentVariable] == undefined) {
    throw new Error(`Environment variable ${expectedEnvironmentVariable} not defined`)
  }
}

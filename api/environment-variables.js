let dotenv = require('dotenv').config()

let expectedEnvironmentVariables = ['PORT', 'SESSION_SECRET', 'PROMO_CODE', 'ALLOW_ORIGIN_URLS']
for(expectedEnvironmentVariable of expectedEnvironmentVariables) {
  if(process.env[expectedEnvironmentVariable] == undefined) {
    throw new Error(`Environment variable ${expectedEnvironmentVariable} not defined`)
  }
}

process.env.ALLOW_ORIGIN_URLS = process.env.ALLOW_ORIGIN_URLS.split(',')

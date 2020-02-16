let dotenv = require('dotenv').config()

let expectedEnvironmentVariables = [ 'ADMIN_USERNAME', 'ADMIN_PASSWORD', 'ALLOW_ORIGIN_URLS', 'NODE_ENV', 'PORT', 'PROMO_CODE', 'SESSION_SECRET', 'STRIPE_KEY', 'SUBMISSION_EMAIL' ]
for(expectedEnvironmentVariable of expectedEnvironmentVariables) {
  if(process.env[expectedEnvironmentVariable] == undefined) {
    throw new Error(`Environment variable ${expectedEnvironmentVariable} not defined`)
  }
}

process.env.ALLOW_ORIGIN_URLS = process.env.ALLOW_ORIGIN_URLS.split(',')

let cors = function(request, response, next) {
  response.header("Content-Security-Policy", "default-src 'self'")
  response.header("X-Frame-Options", "deny")
  response.header("X-Download-Options", "noopen")
  response.header("X-Content-Type-Options", "nosniff")
  response.header("X-Permitted-Cross-Domain-Policies", "none")

  response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  response.header("Access-Control-Allow-Credentials", "true")
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

  // Allow from multiple origins
  let origin = request.get('origin')
  if(process.env.ALLOW_ORIGIN_URLS.includes(origin))
    response.header("Access-Control-Allow-Origin", origin)

  // fuckin optionzz
  if(request.method == 'OPTIONS') response.end()
  else next()
}

module.exports = cors

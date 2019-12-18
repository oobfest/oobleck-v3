let cors = function(request, response, next) {
  // TODO Better CORS!
  response.header("Access-Control-Allow-Origin", "http://localhost:8080")
  response.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE")
  response.header("Access-Control-Allow-Credentials", "true")
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

  // fuckin optionzz
  if(request.method == 'OPTIONS') response.end()
  else {
    console.log(request.method, request.path, request.session.authenticated)
    next()
  }
}

module.exports = cors

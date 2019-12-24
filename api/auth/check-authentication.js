let checkAuthentication = function(request, response, next) {
  if(request.session.authenticated) next()
  else throw new Error("Authentication Required")
}

module.exports = checkAuthentication

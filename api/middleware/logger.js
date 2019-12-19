let log = function(request, response, next) {
  console.log(
    request.session.authenticated ? '✓' : ' ',
    request.method, request.path)
  next()
}

module.exports = log

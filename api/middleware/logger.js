let log = function(request, response, next) {
  console.log(
    request.session.authenticated ? '✓' : ' ',
    request.ip.includes('::ffff:') ? request.ip.split(':').reverse()[0] : request.ip, 
    request.method, request.path)
  next()
}

module.exports = log

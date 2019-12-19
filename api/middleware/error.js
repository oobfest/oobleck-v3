let error = function (error, request, response, next) {
  response.statusMessage = error.message
  response.status(500).end()
}

module.exports = error

let checkAuthorization = acceptedRoles => (request, response, next) => {
  if (acceptedRoles == null) next()
  else if (request.session.role == 'admin') next()
  else if (acceptedRoles.includes(request.session.role)) next()
  else throw new Error("Authorization required")
}

module.exports = checkAuthorization

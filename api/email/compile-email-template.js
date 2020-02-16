let pug = require('pug')

let compileEmailTemplate = function(template) {
  return pug.compileFile(`./email/templates/${template}.pug`)
}

module.exports = compileEmailTemplate

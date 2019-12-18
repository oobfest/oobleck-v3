let pug = require('pug')
let path = require('path')

let compileTemplate = function(template) {
  return pug.compileFile(`email-templates/${template}.pug`)
}

module.exports = compileTemplate

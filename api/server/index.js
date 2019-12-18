let app = require('./app')

const PORT = 9000

let server = app.listen(PORT)

server.on('listening', ()=> {
  console.log("Ready ✨")
})

server.on('error', error=> {
  console.error("Server error! 😢")
  console.error(error)
})

module.exports = server

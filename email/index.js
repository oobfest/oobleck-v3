let readline = require('readline')

let readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

console.log("Email? ")
readlineInterface.prompt()

readlineInterface.on('line', line=> {
  if(line=='y') readlineInterface.close()
  else readlineInterface.prompt()
})

readlineInterface.on('close', ()=> {
  process.exit(0)
})

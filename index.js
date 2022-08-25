const http = require('http')

const {requestHandler} = require('./router/router')

const server = http.createServer(requestHandler)

const PORT = 4400;

const HOSTNAME = 'localhost'

server.listen(PORT, HOSTNAME, ()=> {
    console.log(`Server is running on http://${HOSTNAME}:${PORT}`)
})


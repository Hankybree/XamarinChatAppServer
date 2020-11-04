const express = require('express')
const router = express.Router()
const server = require('../server')
const mySql = require('../database/mysql')
const WebSocketServer = require('ws').Server

const { authUser } = require('../middleware/middleware')

const wss = new WebSocketServer({ server })

wss.on('connection', (socket, req) => {
  console.log(req.socket.remoteAddress + ' has connected')

  socket.onmessage = (message) => {
    console.log(message.data)
    socket.send('Hello client')
  }

  socket.onclose = () => {
    console.log(req.socket.remoteAddress + ' has disconnected')
  }
})

router.get('/messages', authUser, (req, res) => {
  res.send([{msg: 'hej ' + req.user.userName }, {msg: 'ditt id är ' + req.user.userId }])
})

module.exports = router
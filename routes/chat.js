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
  mySql.query('SELECT * FROM messages', (err, messages) => {
    if (err) throw err

    return res.send({ status: 1, msg: 'Fetch successful', messages })
  })
  res.send([{msg: 'hej ' + req.user.userName }, {msg: 'ditt id är ' + req.user.userId }])
})

// router.get('/timer', (req, res) => {
//   const timerId = setTimeout(() => {
//     console.log('')
//   })
// })

module.exports = router
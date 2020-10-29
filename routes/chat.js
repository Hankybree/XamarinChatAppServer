const express = require('express')
const router = express.Router()

const { authUser } = require('../middleware/middleware')

router.get('/messages', authUser, (req, res) => {
  res.send([{msg: 'hej'}, {msg: 'hallå'}])
})

module.exports = router
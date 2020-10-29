const express = require('express')
const router = express.Router()
const mySql = require('../database/mysql')
const jwt = require('jsonwebtoken')

router.get('/login', (req, res) => {
  res.send({ msg: 'logged in' })
})

router.post('/signup', (req, res) => {

  if (req.body.userName == undefined || req.body.userPassword == undefined) {
    return res.send({ status: 3, msg: 'Fill out username and password' })
  }

  if (req.body.userName.length < 6 || req.body.userPassword.length < 6) {
    return res.send({ status: 3, msg: 'Username and password must be atleast 6 characters' })
  }

  mySql.query('SELECT * FROM users WHERE userName=?', [req.body.userName], (err, users) => {
    if (err) throw err

    if (users.length != 0) {
      return res.send({ status: 2, msg: 'User already exist' })
    }

    mySql.query('INSERT INTO users (userName, userPassword) VALUES (?, ?)', [req.body.userName, req.body.userPassword], (err) => {
      if (err) throw err

      return res.send({ msg: 'Done' })
    })
  })
})

module.exports = router
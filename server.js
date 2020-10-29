require('dotenv-flow').config()

const express = require('express')
const app = express()

const cors = require('cors')

app.use(cors())
app.use(express.json())

const mySqlConnection = require('./mysql.js')

app.listen(process.env.PORT, () => {
  console.log('Listening on port: ' + process.env.PORT)
})
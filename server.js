require('dotenv-flow').config()

const express = require('express')
const app = express()

const cors = require('cors')

app.use(cors())
app.use(express.json())

app.listen(process.env.PORT, () => {
  console.log('Listening on port: ' + process.env.PORT)
})

// Routes

const authRoute = require('./routes/auth')
const chatRoute = require('./routes/chat')

app.use('/auth', authRoute)
app.use('/chat', chatRoute)
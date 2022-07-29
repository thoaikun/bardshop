const express = require('express')
const path = require('path')
const morgan = require('morgan')
const fs = require('fs')
const cors = require('cors')
const { corsOption } = require('./config/cors')
const credentials = require('./app/middleware/credentials')
const route = require('./routes/index.route')
const db = require('./config/db')

const port = 3000
const app = express()

// setting up the server
app.use(credentials)

// Cross Origin Resource Sharing
app.use(cors())

// Handle request body from client
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Logging request to a file
let logStreamFile = fs.createWriteStream(path.join(__dirname, '/log/access.log'), { flags: 'a'})

app.use(morgan('combined', { stream: logStreamFile }))

// Define static URL
app.use(express.static(path.join(__dirname, 'public')))

// connect to Mongo database
db.connect()

// routing
route(app)

app.listen(port, () => console.log(`Example app listening on port ${port}`))
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const route = require('./routes/index.route')
const db = require('./config/db')

const port = 3000
const app = express()

// setting up the server
app.use(cors())
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'public')))

// connect to Mongo database
db.connect()

// routing
route(app)

app.listen(port, () => console.log(`Example app listening on port ${port}`))
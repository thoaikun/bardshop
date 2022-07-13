const express = require('express')
const path = require('path')
const morgan = require('morgan')
const methodOverdie = require('method-override')
const {engine} = require('express-handlebars')
const route = require('./routes/index.route')
const db = require('./config/db')

const port = 3000
const app = express()

// setting up the server
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(methodOverdie('_method')) 
app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'public')))

// connect to Mongo database
db.connect()

// loading template engine
app.engine('hbs', engine({
    extname: '.hbs',
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/app/views'))

// routing
route(app)

app.listen(port, () => console.log(`Example app listening on port ${port}`))
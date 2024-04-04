// import express
const express = require('express')
// ROUTES
const route = require("./routes/client/index.route")
// ENV
require('dotenv').config();
// DATABASE
const database = require("./config/database")
// app is the biggest file
const app = express()
// port: 
const port = process.env.PORT

// PUG
app.set('views', './views') 
app.set('view engine', 'pug')

// CONNECT DATABSE
database.connect();


// STATIC FILE
app.use(express.static('public'))

// ROUTE
route(app);


app.listen(port, () => {
  console.log(`Example app listening on port: localhost:${port}`)
})
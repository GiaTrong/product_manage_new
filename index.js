// import express
const express = require('express')
// ROUTES
const route = require("./routes/client/index.route")
// ENV
require('dotenv').config();

// app is the biggest file
const app = express()
// port: 
const port = process.env.PORT

// PUG
app.set('views', './views') 
app.set('view engine', 'pug')

// STATIC FILE
app.use(express.static('public'))

// ROUTE
route(app);


app.listen(port, () => {
  console.log(`Example app listening on port: localhost:${port}`)
})
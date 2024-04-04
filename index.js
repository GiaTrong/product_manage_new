// import express
const express = require('express')
// ROUTES
const route = require("./routes/client/index.route")
const routeAdmin = require("./routes/admin/index.route")
// ENV
require('dotenv').config();
// DATABASE
const database = require("./config/database")
// system config
const systemConfig = require("./config/system")
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

//  APP VARIABLES LOCALS
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// ROUTE
route(app);
routeAdmin(app);


app.listen(port, () => {
  console.log(`Example app listening on port: localhost:${port}`)
})
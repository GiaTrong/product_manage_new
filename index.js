// import express
const express = require('express')
// Cookie-parser
const cookieParser = require('cookie-parser')
// Express-session
const session = require('express-session')
// METHOD OVERRIDE
const methodOverride = require('method-override')
// BODY PARSER
const bodyParser = require('body-parser')
// Express Flash
const flash = require('express-flash')

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

// Express Flash
app.use(cookieParser('Absafsdfsdaf'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// PUG
app.set('views', `${__dirname}/views`) 
app.set('view engine', 'pug')

// CONNECT DATABSE
database.connect();

// STATIC FILE
app.use(express.static(`${__dirname}/public`))

//  APP VARIABLES LOCALS
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// ROUTE
route(app);
routeAdmin(app);


app.listen(port, () => {
  console.log(`Example app listening on port: localhost:${port}`)
})
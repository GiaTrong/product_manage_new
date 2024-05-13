// import express
const express = require("express");
// path
const path = require("path");
// Cookie-parser
const cookieParser = require("cookie-parser");
// Express-session
const session = require("express-session");
// METHOD OVERRIDE
const methodOverride = require("method-override");
// BODY PARSER
const bodyParser = require("body-parser");
// Express Flash
const flash = require("express-flash");
// moment
const moment = require("moment");
// TẠO RA 1 CÁI SERVER RIÊNG CHO THẰNG SOCKET
const { createServer } = require("http");
// SocketIO
const { Server } = require("socket.io");

// ROUTES
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
// ENV
require("dotenv").config();
// DATABASE
const database = require("./config/database");
// system config
const systemConfig = require("./config/system");
// app is the biggest file
const app = express();
// port:
const port = process.env.PORT;

// Express Flash
app.use(cookieParser("Absafsdfsdaf"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

// TINYMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// PUG
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// SocketIO
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
});

// CONNECT DATABSE
database.connect();

// STATIC FILE
app.use(express.static(`${__dirname}/public`));

//  APP VARIABLES LOCALS
app.locals.prefixAdmin = systemConfig.prefixAdmin;
// muốn dùng thằng moment bên FE => biến nó về biến TOÀN CỤC
app.locals.moment = moment;

// ROUTE
route(app);
routeAdmin(app);

// console.log(process.version);

// Ở đây chúng ta dùng server thay cho app nếu dùng thằng socket
server.listen(port, () => {
  console.log(`Example app listening on port: localhost:${port}`);
});

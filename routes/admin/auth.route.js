const express = require("express");
const route = express.Router();

const loginValidate = require("../../validates/admin/login.validate");

const controller = require("../../controllers/admin/auth.controller");
route.get("/login", controller.login);

route.post("/login", loginValidate.loginPost, controller.loginPost);

module.exports = route;

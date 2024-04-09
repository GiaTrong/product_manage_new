const express = require("express");
const route = express.Router();

const dashboardController = require("../../controllers/admin/dashboard.controller");
route.get("/", dashboardController.index);

module.exports = route;

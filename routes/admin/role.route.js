const express = require("express");
const route = express.Router();

const roleController = require("../../controllers/admin/role.controller");
route.get("/", roleController.index);

route.get("/create", roleController.create);

route.post("/create", roleController.createPost);

module.exports = route;

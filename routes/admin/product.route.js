const express = require('express')
const route = express.Router();

const controller = require("../../controllers/admin/product.controller")
route.get('/', controller.index);

route.get('/change-status/:status/:id', controller.changeStatus);

module.exports = route;
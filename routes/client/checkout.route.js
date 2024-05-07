const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/checkout.controller");

router.get("/order", controller.index);

module.exports = router;
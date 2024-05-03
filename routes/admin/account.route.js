const express = require("express");
// UPLOAD IMAGE
const multer = require("multer");
const route = express.Router();

const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const controller = require("../../controllers/admin/account.controller");
const validate = require("../../validates/admin/account.validate");

route.get("/", controller.index);

route.get("/create", controller.create);

route.post(
  "/create",
  upload.single("avatar"),
  validate.createPost,
  uploadCloud.upload,
  controller.createPost
);

module.exports = route;

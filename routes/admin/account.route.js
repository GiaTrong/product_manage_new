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

route.get("/edit/:id", controller.edit);

route.patch(
    "/edit/:id",
    upload.single("avatar"),
    validate.editPatch,
    uploadCloud.upload,
    controller.editPatch
  );


module.exports = route;

const express = require("express");
const multer = require("multer");
const route = express.Router();

const upload = multer();

const controller = require("../../controllers/admin/product-category.controller");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const validate = require("../../validates/admin/product-category.validate");

route.get("/", controller.index);

route.get("/create", controller.create);

route.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);

route.get("/edit/:id", controller.edit);

route.patch(
  "/edit/:id",
  upload.single("thumbnail"), // phải có trường này thì mới có dữ liệu được
                              // vì đã dùng thư viện tải ảnh lên => không có thì sẽ lỗi ko có OBJ
  uploadCloud.upload, 
  validate.createPost,
  controller.editPatch
);

module.exports = route;

const express = require("express");
// UPLOAD IMAGE
const multer = require("multer");
const route = express.Router();

const upload = multer();
// upload cloud
const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware')


const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validate")

route.get("/", controller.index);

route.patch("/change-status/:status/:id", controller.changeStatus);

route.patch("/change-multi", controller.changeMulti);

route.delete("/delete/:id", controller.deleteItem);

route.get("/create", controller.create);

route.post(
    "/create",
    upload.single("thumbnail"),
    validate.createPost,
    uploadCloud.upload,
    controller.createPost
);

route.get("/edit/:id", controller.edit);

route.patch(
    "/edit/:id",
    upload.single("thumbnail"),
    validate.createPost,
    uploadCloud.upload,
    controller.editPatch); 

route.get("/detail/:id", controller.detail);


module.exports = route;

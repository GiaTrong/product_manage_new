const express = require('express')
// UPLOAD IMAGE
const multer  = require('multer')
const route = express.Router();

const upload = multer({ dest: "./public/uploads/" })
// Đường dẫn đến FOLDER lưu trữ ảnh - Bởi vì đứng từ thằng multer(trong file NODE MODULE 
// => ĐỨNG từ file CẤP CAO NHẤT RỒI => chỉ cần ./public/uploads nữa thôi       )

const controller = require("../../controllers/admin/product.controller")

route.get('/', controller.index);

route.patch ('/change-status/:status/:id', controller.changeStatus);

route.patch ('/change-multi', controller.changeMulti);

route.delete ('/delete/:id', controller.deleteItem);

route.get ('/create', controller.create);

route.post ('/create', upload.single('thumbnail'), controller.createPost);

module.exports = route;
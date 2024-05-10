const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer();
const uploadCloud = require("../../middlewares/client/uploadCloud.middleware.js");

const controller = require("../../controllers/client/user.controller");
const validate = require("../../validates/client/user.validate");

router.get("/", controller.index);

router.get("/edit", controller.edit);

router.patch(
  "/edit",
  upload.single("avatar"),
  validate.editPatch,
  uploadCloud.upload,
  controller.editPatch
);

router.get("/register", controller.register);

router.post("/register", validate.registerPost, controller.registerPost);

router.get("/login", controller.login);

router.post("/login", validate.loginPost, controller.loginPost);

router.get("/logout", controller.logout);

router.get("/password/forgot", controller.forgotPassword);

router.post(
  "/password/forgot",
  validate.forgotPassword,
  controller.forgotPasswordPost
);

router.get("/password/otp", controller.otpPassword);

router.post("/password/otp", validate.otpPassword, controller.otpPasswordPost);

router.get("/password/reset", controller.resetPassword);

router.post(
  "/password/reset",
  validate.confirmPassword,
  controller.resetPasswordPost
);

module.exports = router;

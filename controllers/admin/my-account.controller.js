// Mã hóa MD5
const md5 = require("md5");
// SCHEMA
const Account = require("../../models/accounts.model");
//
const systemConfig = require("../../config/system");

// [GET] /admin/my-account
module.exports.index = (req, res) => {
  res.render("admin/pages/my-account/index.pug", {
    pageTitle: "Trang cá nhân",
  });
};

// [GET] /admin/my-account/edit
module.exports.edit = (req, res) => {
  res.render("admin/pages/my-account/edit.pug", {
    pageTitle: "Chỉnh sửa thông tin cá nhân",
  });
};

// [PATCH] /admin/my-account/edit
module.exports.editPatch = async (req, res) => {
  try {
    // CHECK EMAIL
    const id = res.locals.user.id;
    // CHECK EMAIL EXIST
    const emailExist = await Account.findOne({
      _id: { $ne: id }, // tìm những thằng có id KHÁC id truyền vào
      email: req.body.email,
      deleted: false,
    });

    if (emailExist) {
      req.flash("error", `Email ${req.body.email} đã tồn tại`);
      res.redirect("back");
    } else {
      if (req.body.password) {
        req.body.password = md5(req.body.password);
      } else {
        delete req.body.password;
      }

      await Account.updateOne({ _id: id }, req.body);

      req.flash("success", "Thay đổi tài khoản thành công");

      res.redirect(`${systemConfig.prefixAdmin}/my-account`);
    }
  } catch (error) {
    console.log("Err in editPatch.controller.js");
    console.log(error);
    req.flash("error", "Chỉnh sửa tài khoản thất bại");
    res.redirect("back");
  }
};

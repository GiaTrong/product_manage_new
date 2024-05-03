// Mã hóa MD5
const md5 = require("md5");
// SCHEMA
const Account = require("../../models/accounts.model");

const systemConfig = require("../../config/system");

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
  try {
    const find = {
      deleted: false,
    };

    const records = await Account.find(find);

    res.render("admin/pages/accounts/index.pug", {
      pageTitle: "Danh sách tài khoản",
      records: records,
    });
  } catch (error) {
    console.log("Err in role.controller.js");
  }
};

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
  try {
    const find = {
      deleted: false,
    };

    const records = await Account.find(find);

    res.render("admin/pages/accounts/create.pug", {
      pageTitle: "Danh sách tài khoản",
      records: records,
    });
  } catch (error) {
    console.log("Err in role.controller.js");
  }
};

// [POST] /admin/accounts/createPost
module.exports.createPost = async (req, res) => {
  try {
    req.body.password = md5(req.body.password);

    const record = new Account(req.body);

    await record.save();

    req.flash("success", "Tạo tài khoản thành công");

    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  } catch (error) {
    console.log("Err in role.controller.js");
    req.flash("error", "Tạo tài khoản thất bại");
  }
};

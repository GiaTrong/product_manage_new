const md5 = require("md5");
const Account = require("../../models/accounts.model");

const systemConfig = require("../../config/system");

// [GET] /admin/auth/login
module.exports.login = (req, res) => {
  // TOKEN exist
  if(req.cookies.token) {
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
  }

  res.render("admin/pages/auth/login.pug", {
    pageTitle: "Trang đăng nhập",
  });
};

// [POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
  //   const { email, password } = req.body; => destructering
  const email = req.body.email;
  const password = req.body.password;

  const user = await Account.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    req.flash("error", "Email không tồn tại");
    res.redirect("back");
    return;
  } 

  if(md5(password) != user.password) {
    req.flash("error", "Sai mật khẩu");
    res.redirect("back");
    return;
  }

  if (user.status == "inactive") {
    req.flash("error", "Tài khoản bạn bị khóa");
    res.redirect("back");
    return;
  } 
  
  // Đăng nhập thành công => lưu TOKEN vào COOKIE
  res.cookie("token", user.token);

  res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
};

// [GET] /admin/auth/login
module.exports.logout = (req, res) => {

  // xóa token khỏi cookie
  res.clearCookie("token");
  
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
};
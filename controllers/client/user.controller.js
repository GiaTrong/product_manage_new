const md5 = require("md5");
const User = require("../../models/users.model");
const ForgotPassword = require("../../models/forgot-password.module");
const Cart = require("../../models/cart.model");

const generateHelper = require("../../helpers/generate");
const sendMailHelper = require("../../helpers/sendMail");

// // [GET] /user/
// module.exports.index = async (req, res) => {
//   res.render("client/pages/user/index.pug", {
//     pageTitle: "Trang cá nhân",
//   });
// };

// [GET] /user/register
module.exports.register = async (req, res) => {
  res.render("client/pages/user/register.pug", {
    pageTitle: "Trang đăng ký",
  });
};

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
  try {
    const existEmail = await User.findOne({
      email: req.body.email,
      deleted: false,
    });

    if (existEmail) {
      req.flash("error", `Email ${req.body.email} đã tồn tại`);
      res.redirect("back");
      return;
    }

    // mã hóa md5
    req.body.password = md5(req.body.password);

    const user = new User(req.body);

    await user.save();

    // tạo xong => trả về tokenUser vào trong cookie => đăng nhập luôn
    const expiresTime = 1000 * 60 * 60 * 24 * 365;
    res.cookie("tokenUser", user.tokenUser, {
      maxAge: expiresTime,
    });

    res.locals.tokenUser = req.cookies.tokenUser;

    req.flash("success", `Bạn đăng ký tài khoản thành công`);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    req.flash("error", `Đăng ký không thành công`);
    res.redirect("back");
  }
};

// [GET] /user/login
module.exports.login = async (req, res) => {
  if (req.cookies.tokenUser) {
    res.redirect("/");
  }

  res.render("client/pages/user/login.pug", {
    pageTitle: "Trang đăng nhập",
  });
};

// [POST] /user/login
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = md5(req.body.password);

  // CHECK email exist
  const user = await User.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    req.flash("error", `Email ${req.body.email} không tồn tại`);
    res.redirect("back");
    return;
  }

  // CHECK password
  if (user.password !== password) {
    req.flash("error", `Sai mật khẩu`);
    res.redirect("back");
    return;
  }

  // CHECK status
  if (user.status !== "active") {
    req.flash("error", `Tài khoản bị khóa`);
    res.redirect("back");
    return;
  }
  // set tokenUser in cookie
  const expiresTime = 1000 * 60 * 60 * 24 * 365;
  res.cookie("tokenUser", user.tokenUser, {
    maxAge: expiresTime,
  });

  // lưu user id vào collection carts
  await Cart.updateOne(
    {
      _id: req.cookies.cartId,
    },
    {
      user_id: user.id,
    }
  );

  req.flash("success", `Đăng nhập thành công`);
  res.redirect("/");
};

// [GET] /user/logout
module.exports.logout = async (req, res) => {
  res.clearCookie("tokenUser");

  res.redirect("/user/login");
};

// [GET] /user/password/forgot
module.exports.forgotPassword = async (req, res) => {
  res.render("client/pages/user/forgot-password.pug", {
    pageTitle: "Trang lấy lại mật khẩu",
  });
};

// [POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    deleted: false,
  });

  // email does not exist
  if (!user) {
    req.flash("error", `Email ${req.body.email} không tồn tại`);
    res.redirect("back");
    return;
  }

  // Việc 1: Tạo mã OTP và lưu OTP, email vào collection
  const otp = generateHelper.generateRandomNumber(6);

  const objForgotPassword = {
    email: req.body.email,
    otp: otp,
    expireAt: Date.now(),
  };

  const forgotPassword = new ForgotPassword(objForgotPassword);

  await forgotPassword.save();

  // Việc2 : Gửi mã OTP qua email của User
  const subject = `Mã OTP xác minh lấy lại mật khẩu`;
  const html = `
    Mã OTP xác minh lấy lại mật khẩu là <b>${otp}</b>. 
    Thời hạn sử dụng chỉ có 3p
    Lưu ý không được để lộ mã OTP 
  `;
  sendMailHelper.sendMail(req.body.email, subject, html);

  res.redirect(`/user/password/otp?email=${req.body.email}`);
};

// [GET] /user/password/otp
module.exports.otpPassword = async (req, res) => {
  const email = req.query.email;

  res.render("client/pages/user/otp-password.pug", {
    pageTitle: "Trang nhập otp",
    email: email,
  });
};

// [POST] /user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;

  const result = await ForgotPassword.findOne({
    email: email,
    otp: otp,
  });

  if (!result) {
    req.flash("error", `OTP không hợp lệ`);
    res.redirect("back");
    return;
  }

  const user = await User.findOne({
    email: email,
  });

  res.cookie("tokenUser", user.tokenUser);

  res.redirect("/user/password/reset");
};

// [GET] /user/password/reset
module.exports.resetPassword = async (req, res) => {
  res.render("client/pages/user/reset-password.pug", {
    pageTitle: "Trang đổi mật khẩu",
  });
};

// [POST] /user/password/reset
module.exports.resetPasswordPost = async (req, res) => {
  try {
    const password = req.body.password;
    const tokenUser = req.cookies.tokenUser;

    await User.updateOne({ tokenUser: tokenUser }, { password: md5(password) });

    req.flash("success", "Đổi mật khẩu thành công");

    res.redirect("/");
  } catch (error) {
    req.flash("error", "Đổi mật khẩu thất bại");
    res.redirect("back");
  }
};

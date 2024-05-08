const md5 = require("md5");
const User = require("../../models/users.model");

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
  })

  req.flash("success", `Đăng nhập thành công`);
  res.redirect("/");
};

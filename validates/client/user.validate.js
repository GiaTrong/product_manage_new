module.exports.registerPost = (req, res, next) => {
  if (!req.body.fullName.trim()) {
    req.flash("error", "Vui lòng nhập Họ Tên");
    res.redirect(`back`);
    return;
  }

  if (!req.body.email.trim()) {
    req.flash("error", "Vui lòng nhập Email");
    res.redirect(`back`);
    return;
  }

  if (!req.body.password.trim()) {
    req.flash("error", "Vui lòng nhập mật khẩu");
    res.redirect(`back`);
    return;
  }

  next();
};

module.exports.loginPost = (req, res, next) => {
  if (!req.body.email.trim()) {
    req.flash("error", "Vui lòng nhập Email");
    res.redirect(`back`);
    return;
  }

  if (!req.body.password.trim()) {
    req.flash("error", "Vui lòng nhập mật khẩu");
    res.redirect(`back`);
    return;
  }

  next();
};


module.exports.forgotPassword = (req, res, next) => {
  if (!req.body.email.trim()) {
    req.flash("error", "Vui lòng nhập Email");
    res.redirect(`back`);
    return;
  }
  
  next();
};

module.exports.otpPassword = (req, res, next) => {
  if (!req.body.email.trim()) {
    req.flash("error", "Vui lòng nhập Email");
    res.redirect(`back`);
    return;
  }

  if (!req.body.otp.trim()) {
    req.flash("error", "Vui lòng nhập otp");
    res.redirect(`back`);
    return;
  }
  
  next();
};

module.exports.confirmPassword = (req, res, next) => {
  if (!req.body.password.trim()) {
    req.flash("error", "Vui lòng nhập password");
    res.redirect(`back`);
    return;
  }

  if (!req.body.confirmPassword.trim()) {
    req.flash("error", "Vui lòng nhập xác nhận lại mật khẩu");
    res.redirect(`back`);
    return;
  }

  if(req.body.password.trim() != req.body.confirmPassword.trim()) {
    req.flash("error", "Vui lòng xác nhận lại mật khẩu");
    res.redirect(`back`);
    return;
  }
  
  next();
};

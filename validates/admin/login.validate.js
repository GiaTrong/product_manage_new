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
}
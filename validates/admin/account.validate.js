// req, res, next: ĐÂY LÀ NHỮNG HÀM CỦA EXPRESS CÓ SẴN CHO CHÚNG TA DÙNG
module.exports.createPost = (req, res, next) => {
  if (!req.body.fullName.trim()) {
    req.flash("error", "Vui lòng nhập họ tên");
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

  // console.log("oke")
  // next: đi tiếp
  next();
};

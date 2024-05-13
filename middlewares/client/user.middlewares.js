const User = require("../../models/users.model");

module.exports.infoUser = async (req, res, next) => {
  if (req.cookies.tokenUser) {
    const user = await User.findOne({
      tokenUser: req.cookies.tokenUser,
      deleted: false,
    }).select("-password");
    res.locals.user = user;
  }

  next();
};

module.exports.requireAuth = async (req, res, next) => {
  if(!req.cookies.tokenUser) {
    res.redirect("/user/login");
  } else {
    const user = await User.findOne({
      tokenUser: req.cookies.tokenUser,
      deleted: false,
    }).select("-password");

    if(!user) {
      res.redirect("/user/login");
    } else {
      res.locals.infoUser = user;
      
      next();
    }
  }
}

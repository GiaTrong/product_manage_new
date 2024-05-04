const Account = require("../../models/accounts.model");
const Role = require("../../models/roles.model");

const systemConfig = require("../../config/system");

module.exports.requireAuth = async (req, res, next) => {
  if (!req.cookies.token) {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  } else {
    // find user by TOKEN
    const user = await Account.findOne({
      token: req.cookies.token,
      deleted: false,
    }).select("-password");

    if (!user) {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
      console.log("login success");
      
      const role = await Role.findOne({
        _id: user.role_id,
        deleted: false,
      }).select("title permissions");
      
      // trả về thông tin của tài khoản: role là gì, làm được gì, ....
      res.locals.user = user;
      res.locals.role = role;

      //
      next();
    }
  }
};

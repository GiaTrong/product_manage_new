const Account = require("../../models/accounts.model");
const Role = require("../../models/roles.model");

const systemConfig = require("../../config/system");

module.exports.requireAuth = async (req, res, next) => {
  // token does not exist
  if (!req.cookies.token) {
    // redirect LOGIN
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  } else {
    // find user by TOKEN
    const user = await Account.findOne({
      token: req.cookies.token,
      deleted: false,
    }).select("-password");

    if (!user) {
      // redirect LOGIN
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
      // login SUCCESS
      console.log("login success");
      
      // find ROLE by user.role_id
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

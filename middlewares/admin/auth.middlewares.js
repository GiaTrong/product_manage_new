const Account = require("../../models/accounts.model");

const systemConfig = require("../../config/system");

module.exports.requireAuth = async (req, res, next) => {
  if (!req.cookies.token) {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  } else {
    // find user by TOKEN
    const user = await Account.findOne({
      token: req.cookies.token,
      deleted: false,
    });

    if (!user) {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
      //
      next();
    }
  }
};

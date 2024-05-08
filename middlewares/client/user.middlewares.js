const User = require("../../models/users.model");

module.exports.userId = async (req, res, next) => {

    if(req.cookies.tokenUser) {
        res.locals.tokenUser = req.cookies.tokenUser;
    }

    next();
}
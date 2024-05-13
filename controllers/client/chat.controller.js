const Product = require("../../models/product.model");

const productsHelper = require("../../helpers/product");
// [GET] /
module.exports.index = async (req, res) => {
  res.render("client/pages/chat/index.pug", {
    pageTitle: "Trang chu",
  });
};

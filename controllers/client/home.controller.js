const Product = require("../../models/product.model");

const productsHelper = require("../../helpers/product");
// [GET] /
module.exports.index = async (req, res) => {
  // lấy ra những sản phẩm nổi bật
  const productFeatured = await Product.find({
    featured: "1",
    deleted: false,
    status: "active",
  }).limit(6);

  const newProductsFeatured = productsHelper.priceNewProducts(productFeatured);

  res.render("client/pages/home/index.pug", {
    pageTitle: "Trang chu",
    newProductsFeatured: newProductsFeatured
  });
};

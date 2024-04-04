const Product = require("../../models/product.model")

module.exports.index = async (req, res) => {
  // find({CONDITION}) => find all products which fit(phù hợp) with condition
  const products = await Product.find({
    status: "active",
    deleted: false,
  });

  // console.log(products)

  const newProducts = products.map(item => {
    item.priceNew = Math.floor(item.price * (100 - item.discountPercentage) / 100);
    return item;
  })

    res.render("client/pages/products/index.pug", {
        pageTitle: "Trang products",
        products: newProducts
      });
}
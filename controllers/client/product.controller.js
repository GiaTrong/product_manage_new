const Product = require("../../models/product.model")

// [GET] /products
module.exports.index = async (req, res) => {
  // find({CONDITION}) => find all products which fit(phù hợp) with condition
  const products = await Product.find({
    status: "active",
    deleted: false,
  }).sort({position: "desc"});

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

//[GET] module.exports.index : index is name of function
module.exports.detail = async (req, res) => {
  try {
    const product = await Product.findOne({
      deleted: false,
      status: "active",
      slug: req.params.slug,
    });
    console.log(product);

    // render in viewer
    res.render("client/pages/products/detail", {
      pageTitle: "Chi tiet san pham",
      product: product,
    });
  } catch (error) {
    res.redirect("back");
  }
};
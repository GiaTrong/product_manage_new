const Product = require("../../models/product.model")

// [GET] /admin/products
module.exports.index = async (req, res) => {
    // GIVE product
    const products = await Product.find({
        status: "active",
        deleted: false,
      });

    //   console.log(products)

  res.render("admin/pages/products/index.pug", {
    pageTitle: "Trang quản lí sản phẩm",
    products: products
  });
};

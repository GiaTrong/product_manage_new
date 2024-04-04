const Product = require("../../models/product.model");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  if(req.query.status) {
    find.status = req.query.status;
  }

  // GIVE product
  const products = await Product.find(find);

  console.log(products);

  res.render("admin/pages/products/index.pug", {
    pageTitle: "Trang quản lí sản phẩm",
    products: products,
    status: req.query.status
  });
};

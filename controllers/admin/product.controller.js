const Product = require("../../models/product.model");
const filterStatusHelper = require('../../helpers/filterStatus')

// [GET] /admin/products
module.exports.index = async (req, res) => {

  // FILTER STATUS
  const filterStatus = filterStatusHelper(req);
  
  // CONDITION of filter DATA
  let find = {
    deleted: false,
  };

  if(req.query.status) {
    // filter DATA follow params
    find.status = req.query.status;
  }

  // SEARCH BY KEYWORD
  // fix cứng 
  let keyword = "";
  if(req.query.keyword) {
    keyword = req.query.keyword

    // use REGEX for searching DATA which similar keyword
    const regex = new RegExp(keyword, "i");

    find.title = regex
  }

  // GIVE product by FIND
  const products = await Product.find(find);


  res.render("admin/pages/products/index.pug", {
    pageTitle: "Trang quản lí sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: keyword
  });
};

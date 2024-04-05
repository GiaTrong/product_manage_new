const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  // FILTER STATUS
  const filterStatus = filterStatusHelper(req);

  // CONDITION of filter DATA
  let find = {
    deleted: false,
  };

  if (req.query.status) {
    // filter DATA follow params
    find.status = req.query.status;
  }

  // SEARCH BY KEYWORD
  const objSearch = searchHelper(req);

  let keyword = "";
  if(req.query.keyword) {
    keyword =  objSearch.keyword;

    find.title = objSearch.regex;
  }
  

  // GIVE product by FIND
  const products = await Product.find(find);

  res.render("admin/pages/products/index.pug", {
    pageTitle: "Trang quản lí sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: keyword,
  });
};

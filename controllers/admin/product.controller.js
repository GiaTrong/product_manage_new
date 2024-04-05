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
  if (req.query.keyword) {
    keyword = objSearch.keyword;

    find.title = objSearch.regex;
  }

  // PAGINATION
  let objectPagination = {
    currentPage: 1,
    limitItem: 6,
  };

  if (req.query.page) {
    objectPagination.currentPage = parseInt(req.query.page);
  }

  // skip = (trang hiện tại - 1) * số lượng phần tử mỗi trang
  objectPagination.skip =
    (objectPagination.currentPage - 1) * objectPagination.limitItem;

  // amount of page
  const countProduct = await Product.countDocuments(find);
  const totalPage = Math.ceil(countProduct / objectPagination.limitItem);
  objectPagination.totalPage = totalPage;
  // console.log(totalPage)

  // GIVE product by FIND
  // .limit(number) => chỉ lấy tưng đấy sản phẩm thôi
  // skip: bỏ qua bao nhiêu sản phẩm
  const products = await Product.find(find)
  .limit(objectPagination.limitItem)
  .skip(objectPagination.skip);

  res.render("admin/pages/products/index.pug", {
    pageTitle: "Trang quản lí sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: keyword,
    pagination: objectPagination
  });
};

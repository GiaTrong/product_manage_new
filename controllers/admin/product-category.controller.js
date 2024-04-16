const productCategory = require("../../models/product-category.model");

const systemConfig = require("../../config/system");

const createTreeHelper = require("../../helpers/createTree")

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };

  const records = await productCategory.find(find);

  const newRecords = createTreeHelper.createTree(records);

  res.render("admin/pages/product-category/index.pug", {
    pageTitle: "Trang danh mục sản phẩm",
    records: newRecords,
  });
};

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  const find = {
    deleted: false,
  };

  const records = await productCategory.find(find);

  const newRecords = createTreeHelper.createTree(records);

  // console.log(newRecords)

  res.render("admin/pages/product-category/create.pug", {
    pageTitle: "Tạo danh mục",
    records: newRecords,
  });
};

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  console.log(req.body);

  // case: POSITION : AUTO INCREASE
  if (req.body.position == "") {
    const countProduct = await productCategory.countDocuments();
    req.body.position = countProduct + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  const record = new productCategory(req.body);

  await record.save();

  // render viewer
  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
};

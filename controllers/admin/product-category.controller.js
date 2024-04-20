const productCategory = require("../../models/product-category.model");

const systemConfig = require("../../config/system");

const createTreeHelper = require("../../helpers/createTree");

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };

  const records = await productCategory.find(find);

  const newRecords = createTreeHelper.createTree(records);

  console.log(newRecords)

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

// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
  const id = req.params.id;

  const data = await productCategory.findOne({_id: id, deleted: false})

  const records = await productCategory.find({deleted: false});
  const newRecords = createTreeHelper.createTree(records);

  res.render("admin/pages/product-category/edit.pug", {
    pageTitle: "Trang chỉnh sửa danh mục sản phẩm",
    data: data,
    records: newRecords,
  });
};

// [PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => { 
  const id = req.params.id;

  await productCategory.updateOne({_id: id}, req.body)

  req.flash("success", "Update thành công");
  // render viewer
  res.redirect(`${systemConfig.prefixAdmin}/products-category/edit/${id}`)
};
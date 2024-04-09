const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  // CONDITION of filter DATA
  let find = {
    deleted: false,
  };

  // FILTER STATUS
  const filterStatus = filterStatusHelper(req);

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
  const countProduct = await Product.countDocuments(find);

  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItem: 6,
    },
    req,
    countProduct
  );

  // GIVE product by FIND
  // .limit(number) => chỉ lấy tưng đấy sản phẩm thôi
  // skip: bỏ qua bao nhiêu sản phẩm
  const products = await Product.find(find)
    .sort({ position: "desc" })
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);

  res.render("admin/pages/products/index.pug", {
    pageTitle: "Trang quản lí sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: keyword,
    pagination: objectPagination,
  });
};

// [PATCH] /admin/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });

  req.flash("success", "Cập nhật trạng thái thành công");

  res.redirect("back");
};

// [PATCH] /admin/change-multi
module.exports.changeMulti = async (req, res) => {
  console.log(req.body);

  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  // UPDATE nhiều sản phẩm
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: type });
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: type });
      break;
    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        {
          deleted: true,
          deleteAt: new Date(),
        }
      );
      break;
    case "change-position":
      for (const item of ids) {
        // cấu trúc destructering phá vỡ cấu trúc
        let [id, position] = item.split("-");
        // parse từ String => int
        position = parseInt(position);
        // update
        await Product.updateOne({ _id: id }, { position: position });
      }
      break;
    default:
      break;
  }

  // res.send("oke")
  res.redirect("back");
};

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  await Product.updateOne(
    { _id: id },
    {
      deleted: true,
      deleteAt: new Date(),
    }
  );

  // res.send("oke")
  res.redirect("back");
};

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create", {
    pageTitle: "Trang thêm mới sản phẩm",
  });
};

// [POST] /admin/products/createPost
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.stock = parseInt(req.body.stock);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);

  // case: POSITION : AUTO INCREASE
  if (req.body.position == "") {
    const countProduct = await Product.countDocuments();
    req.body.position = countProduct + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  // create new Product
  const product = new Product(req.body);
  // saving in DATABASE
  await product.save();
  // render viewer
  res.redirect(`${systemConfig.prefixAdmin}/products`);
};

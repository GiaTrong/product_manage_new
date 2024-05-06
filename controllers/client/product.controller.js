const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");

const productsHelper = require("../../helpers/product");
const paginationHelper = require("../../helpers/pagination");
const productsCategoryHelper = require("../../helpers/product-category");

// [GET] /products
module.exports.index = async (req, res) => {
  const find = {
    status: "active",
    deleted: false,
  };

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

  // find({CONDITION}) => find all products which fit(phù hợp) with condition
  const products = await Product
  .find(find)
  .sort({ position: "desc" })
  .limit(objectPagination.limitItem)
  .skip(objectPagination.skip);

  const newProducts = productsHelper.priceNewProducts(products);

  res.render("client/pages/products/index.pug", {
    pageTitle: "Trang products",
    products: newProducts,
    pagination: objectPagination,
  });
};

//[GET] module.exports.index : index is name of function
module.exports.detail = async (req, res) => {
  try {
    // tìm products theo SLUG
    const product = await Product.findOne({
      deleted: false,
      status: "active",
      slug: req.params.slugProduct,
    });

    // thêm key: category
    if (product.product_category_id) {
      const category = await ProductCategory.findOne({
        _id: product.product_category_id,
        deleted: false,
        status: "active",
      });

      product.category = category;
    }

    // lấy giá mới
    product.priceNew = productsHelper.priceNewProduct(product);

    // render in viewer
    res.render("client/pages/products/detail", {
      pageTitle: "Chi tiet san pham",
      product: product,
    });
  } catch (error) {
    res.redirect("back");
  }
};

// [GET] /products/:slugCategory
module.exports.category = async (req, res) => {
  try {
    // tìm category theo SLUG
    const category = await ProductCategory.findOne({
      slug: req.params.slugCategory,
      deleted: false,
      status: "active",
    });

    // tìm ra list con của category truyền vào
    const listSubCategory = await productsCategoryHelper.getSubCategory(
      category.id
    );
    // tìm ra list id
    const listSubCategoryId = listSubCategory.map((subCategory) => {
      return subCategory.id;
    });

    const products = await Product.find({
      // tìm trong mảng CHỨA id category, và con của những category đó
      product_category_id: { $in: [category.id, ...listSubCategoryId] },
      deleted: false,
      status: "active",
    }).sort({ position: "desc" });

    // format lại giá
    const productsNew = productsHelper.priceNewProducts(products);

    let objectPagination = paginationHelper(
      {
        currentPage: 1,
        limitItem: 6,
      },
      req,
      productsNew.length, 
    );

    res.render("client/pages/products/index.pug", {
      pageTitle: category.title,
      products: productsNew,
      pagination : objectPagination,
    });
  } catch (error) {
    console.log(error);
    res.redirect(`/products`);
  }
};

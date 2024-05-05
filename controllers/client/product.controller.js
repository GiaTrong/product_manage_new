const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");

const productsHelper = require("../../helpers/product");
const productsCategoryHelper = require("../../helpers/product-category");

// [GET] /products
module.exports.index = async (req, res) => {
  // find({CONDITION}) => find all products which fit(phù hợp) with condition
  const products = await Product.find({
    status: "active",
    deleted: false,
  }).sort({ position: "desc" });

  // console.log(products)

  const newProducts = productsHelper.priceNewProducts(products);

  res.render("client/pages/products/index.pug", {
    pageTitle: "Trang products",
    products: newProducts,
  });
};

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
    const listSubCategory = await productsCategoryHelper.getSubCategory(category.id);
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

    res.render("client/pages/products/index.pug", {
      pageTitle: category.title,
      products: productsNew,
    });
  } catch (error) {
    console.log(error);
    res.redirect(`/products`);
  }
};

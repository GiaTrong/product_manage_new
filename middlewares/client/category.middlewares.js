const productCategory = require("../../models/product-category.model");

const createTreeHelper = require("../../helpers/createTree");

module.exports.category = async (req, res, next) => {
  const productsCategory = await productCategory.find({
    deleted: false,
  });

  const newProductsCategory = createTreeHelper.createTree(productsCategory);

  // newProductsCategory => biến locals
  res.locals.layoutProductsCategory = newProductsCategory;

  next();
};

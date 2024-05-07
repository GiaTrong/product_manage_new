const Product = require("../../models/product.model");
const Cart = require("../../models/cart.model");
const Order = require("../../models/order.model");

const productsHelper = require("../../helpers/product");

// [GET] /checkout/order
module.exports.index = async (req, res) => {
  // cartId
  const cartId = req.cookies.cartId;

  // find cart by cartId
  const cart = await Cart.findOne({
    _id: cartId,
  });

  if (cart.products.length > 0) {
    // find all product exist in cart
    for (const item of cart.products) {
      const productId = item.product_id;

      const productInfo = await Product.findOne({
        _id: productId,
      });

      productInfo.priceNew = productsHelper.priceNewProduct(productInfo);

      // bởi vì lặp qua từng phần tử trong mảng, mà phần tử đó là OBJ => OBJ được thêm key value mới luôn
      item.productInfo = productInfo;

      // total price product
      productInfo.totalPrice = parseInt(productInfo.priceNew) * item.quantity;
    }
  }

  // total price cart
  cart.totalPrice = cart.products.reduce(
    (sum, item) => sum + item.productInfo.totalPrice,
    0
  );

  res.render("client/pages/checkout/index.pug", {
    pageTitle: "Trang thanh toán",
    cartDetail: cart,
  });
};

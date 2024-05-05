const Product = require("../../models/product.model");
const Cart = require("../../models/cart.model");

const productsHelper = require("../../helpers/product");

// [GET] /cart
module.exports.index = async (req, res) => {
  res.send("oke");
};

// [POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {
  try {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);

    // obj products
    const objectCart = {
      product_id: productId,
      quantity: quantity,
    };

    const cart = await Cart.findOne({ _id: cartId });

    // tìm sản phẩm đã có trong giỏ hàng chưa - product exist in cart
    const existProductInCart = cart.products.find(
      (item) => item.product_id == productId
    );

    if (existProductInCart) {
      // Cập nhật số lượng products đã có trong giỏ hàng - update quantity of product are existed in cart
      const newQuantity = quantity + existProductInCart.quantity;

      await Cart.updateOne(
        {
          _id: cartId,
          "products.product_id": productId,
        },
        {
          "products.$.quantity": newQuantity,
        }
      ); 
    } else {
      // lưu vào giỏ hàng
      await Cart.updateOne(
        { _id: cartId },
        {
          $push: { products: objectCart },
        }
      );
    }

    req.flash("success", "Thêm sản phẩm vào giỏ hàng thành công");
    res.redirect("back");
  } catch (error) {
    console.log(error);
    res.redirect("back");
    req.flash("error", "Thêm sản phẩm vào giỏ hàng thất bại");
  }
};

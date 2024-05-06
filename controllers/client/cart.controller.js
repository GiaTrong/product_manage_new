const Product = require("../../models/product.model");
const Cart = require("../../models/cart.model");

const productsHelper = require("../../helpers/product");

// [GET] /cart
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
      item.totalPrice = parseInt(productInfo.priceNew) * item.quantity;
    }
  }

  // total price cart
  cart.totalPrice = cart.products.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  res.render("client/pages/cart/index.pug", {
    pageTitle: "Giỏ hàng",
    cartDetail: cart,
  });
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

// [GET] /cart/delete/:productId
module.exports.delete = async (req, res) => {
  try {
    const product_id = req.params.productId;

    // find product exist in cart or not
    const productInCart = (
      await Cart.findOne({
        _id: req.cookies.cartId,
      })
    ).products.find((item) => item.product_id == product_id);

    if (productInCart) {
      // delete product in cart
      await Cart.updateOne(
        { _id: req.cookies.cartId },
        {
          $pull: { products: { product_id: product_id } },
        }
      );
      // Cart exist
      req.flash("success", "Xóa thành công");
    } else {
      req.flash("error", "Sản phẩm không còn tồn tại trong cart");
    }

    res.redirect("back");
  } catch (error) {
    console.log(err);
    res.redirect("back");
  }
};

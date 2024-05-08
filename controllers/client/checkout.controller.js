const Product = require("../../models/product.model");
const Cart = require("../../models/cart.model");
const Order = require("../../models/order.model");

const productsHelper = require("../../helpers/product");

// [GET] /checkout/
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

// [POST] /checkout/order
module.exports.orderPost = async (req, res) => {
  try {
    // INFO from client
    const cartId = req.cookies.cartId;
    const infoUser = req.body;
    // find cart
    const cart = await Cart.findOne({
      _id: cartId,
    });

    let products = [];
    if (cart.products.length > 0) {
      // create new products array follow order.model
      for (const product of cart.products) {
        const objProduct = {
          product_id: product.product_id,
          price: 0,
          discountPercentage: 0,
          quantity: product.quantity,
        };

        // find price and discountPercentage for objProduct
        const productInfo = await Product.findOne({
          _id: product.product_id,
        });

        objProduct.price = productInfo.price;
        objProduct.discountPercentage = productInfo.discountPercentage;

        products.push(objProduct);
      }
    }

    // obj order
    const objOrder = {
      cart_id: cartId,
      userInfo: infoUser,
      products: products,
    };

    const order = new Order(objOrder);

    await order.save();

    // update products in Cart - delete all products in Cart
    await Cart.updateOne(
      {
        _id: cartId,
      },
      {
        products: [],
      }
    );

    req.flash("success", "Đặt hàng thành công");
    res.redirect(`/checkout/success/${order._id}`);
  } catch (error) {
    req.flash("error", "Đặt hàng thất bại");
    res.redirect("back");
  }
};

// [GET] /checkout/success/:orderId
module.exports.success = async (req, res) => {
  const orderId = req.params.orderId;
  const order = await Order.findOne({ _id: orderId });

  for (const product of order.products) {
    const productInfo = await Product.findOne({
      _id: product.product_id,
    }).select("title thumbnail");

    product.productInfo = productInfo;

    product.priceNew = productsHelper.priceNewProduct(product);

    product.totalPrice = product.priceNew * product.quantity;
  }

  order.totalPrice = order.products.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  res.render("client/pages/checkout/success.pug", {
    pageTitle: "Đặt hàng thành công",
    order: order,
  });
};

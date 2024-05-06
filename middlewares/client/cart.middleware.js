const Cart = require("../../models/cart.model");

module.exports.cartId = async (req, res, next) => {

    if(!req.cookies.cartId) {
        // tạo giỏ hàng mới khi lần đầu đăng nhập
        const cart = new Cart();
        // lưu vào DB
        await cart.save();
        // lưu cartId vào cookie
        const expiresTime = 1000 * 60 * 60 * 24 * 365;

        res.cookie("cartId", cart.id, {
            expires: new Date(Date.now() + expiresTime)
        });
    } else {
        // cartId exist
        const cart = await Cart.findOne({
            _id: req.cookies.cartId,
        });

        cart.totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0);

        res.locals.miniCart = cart;
    }

    next();
}
const mongoose = require("mongoose");

// timestamps : Khi chỉnh sửa 1 trường nào đó, nó sẽ tự động chỉnh TIME
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  deleted: {
    type: Boolean,
    default: false,
  },
  deleteAt: Date,
}, {
  timestamps: true,
});
const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;

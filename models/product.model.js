const mongoose = require("mongoose");

// mongoose-slug-updater
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

// timestamps : Khi chỉnh sửa 1 trường nào đó, nó sẽ tự động chỉnh TIME
const productSchema = new mongoose.Schema(
  {
    title: String, // san pham 1
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    slug: {
        type: String,
        slug: "title", //san-pham-1
        unique: true,
      },
    deleted: {
      type: Boolean,
      default: false,
    },
    deleteAt: Date,
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;

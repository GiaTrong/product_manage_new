const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

// timestamps : Khi chỉnh sửa 1 trường nào đó, nó sẽ tự động chỉnh TIME
const productCategorySchema = new mongoose.Schema(
  {
    title: String, // san pham 1
    parent_id: {
      type: String,
      default: "",
    },
    description: String,
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
const ProductCategory = mongoose.model(
  "ProductCategory",
  productCategorySchema,
  "products-category"
);

module.exports = ProductCategory;

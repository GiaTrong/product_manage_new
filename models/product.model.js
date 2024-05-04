const mongoose = require("mongoose");

// mongoose-slug-updater
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

// timestamps : Khi chỉnh sửa 1 trường nào đó, nó sẽ tự động chỉnh TIME
const productSchema = new mongoose.Schema(
  {
    title: String, // san pham 1
    product_category_id: {
      type: String,
      default: "",
    },
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
    createdBy: {
      account_id: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    updatedBy: [
      {
        account_id: String,
        updatedAt: Date,
      },
    ],
    deletedBy: {
      account_id: String,
      deletedAt: Date, // giá trị default chỉ sinh ra khi tạo mới 1 => Khi xóa là cập nhật
      // => giá trị default ko được cập nhật vào
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;

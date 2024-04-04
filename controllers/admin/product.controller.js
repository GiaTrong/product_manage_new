const Product = require("../../models/product.model");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  // Buttons for user click to filter DATA follow status
  let filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: "active"
    },
    {
      name: "Hoạt động",
      status: "active",
      class: ""
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: ""
    },
  ]

  // CONDITION of filter DATA
  let find = {
    deleted: false,
  };

  if(req.query.status) {
    // filter DATA follow params
    find.status = req.query.status;

    // CHANGE CLASS active
    filterStatus.forEach(item => {
      if(item.status == req.query.status) {
        item.class = "active";
      } else {
        item.class = "";
      }
    })
  }

  // GIVE product by FIND
  const products = await Product.find(find);

  // console.log(products);

  res.render("admin/pages/products/index.pug", {
    pageTitle: "Trang quản lí sản phẩm",
    products: products,
    filterStatus: filterStatus
  });
};

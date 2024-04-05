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

  // SEARCH BY KEYWORD
  // fix cứng 
  let keyword = "";
  if(req.query.keyword) {
    keyword = req.query.keyword

    // use REGEX for searching DATA which similar keyword
    const regex = new RegExp(keyword, "i");

    find.title = regex
  }

  // GIVE product by FIND
  const products = await Product.find(find);


  res.render("admin/pages/products/index.pug", {
    pageTitle: "Trang quản lí sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: keyword
  });
};

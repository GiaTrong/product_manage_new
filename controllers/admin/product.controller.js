module.exports.index = (req, res) => {
  res.render("admin/pages/products/index.pug", {
    pageTitle: "Trang quản lí sản phẩm",
  });
};

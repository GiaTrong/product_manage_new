const categoryMiddlewares = require("../../middlewares/client/category.middlewares");

const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");
const searchRoutes = require("./search.route");

module.exports = (app) => {
  app.use(categoryMiddlewares.category); // app đi qua thằng này đầu tiên

  app.use("/", homeRoutes);

  app.use("/products", productRoutes);

  app.use("/search", searchRoutes);

};

const systemConfig = require("../../config/system.js");

const authMiddlewares = require("../../middlewares/admin/auth.middlewares.js");

const dashboardRoutes = require("./dashboard.route.js");
const productRoutes = require("./product.route.js");
const productCategoryRoutes = require("./product-category.route.js");
const roleRoutes = require("./role.route.js");
const accountRoutes = require("./account.route.js");
const authRoutes = require("./auth.route.js");

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.use(PATH_ADMIN + "/dashboard", authMiddlewares.requireAuth, dashboardRoutes);

  app.use(PATH_ADMIN + "/products", authMiddlewares.requireAuth, productRoutes);

  app.use(PATH_ADMIN + "/products-category", authMiddlewares.requireAuth, productCategoryRoutes);

  app.use(PATH_ADMIN + "/roles", authMiddlewares.requireAuth, roleRoutes);

  app.use(PATH_ADMIN + "/accounts", authMiddlewares.requireAuth, accountRoutes);

  app.use(PATH_ADMIN + "/auth", authRoutes);
};

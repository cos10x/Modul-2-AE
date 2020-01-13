const sequelize = require("../config/db");

const Product = sequelize.import("./product.js");

module.exports = { Product, sequelize };

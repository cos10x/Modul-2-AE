module.exports = function(sequelize, DataTypes) {
  return sequelize.define("product", {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT
  });
};

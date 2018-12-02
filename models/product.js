module.exports = function(sequelize, DataTypes) {
  const Product = sequelize.define("Product", {
    amazonid: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  });

  return Product;
};

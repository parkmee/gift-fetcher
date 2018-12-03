module.exports = function(sequelize, DataTypes) {
  const Product = sequelize.define("Product", {
    amazonId: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    productUrl: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  });

  Product.associate = function(models) {
    Product.hasMany(models.SavedProduct, {
      onDelete: "cascade"
    });
  };

  Product.associate = function(models) {
    Product.hasMany(models.Purchase, {
      onDelete: "cascade"
    });
  };

  return Product;
};

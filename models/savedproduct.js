module.exports = function(sequelize, DataTypes) {
  const SavedProduct = sequelize.define("SavedProduct", {
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  SavedProduct.associate = function(models) {
    SavedProduct.belongsTo(models.Person, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  SavedProduct.associate = function(models) {
    SavedProduct.belongsTo(models.Product, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return SavedProduct;
};

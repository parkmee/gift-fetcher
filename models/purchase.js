module.exports = function(sequelize, DataTypes) {
  const Purchase = sequelize.define("Purchase", {
    purchasedate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  Purchase.associate = function(models) {
    Purchase.belongsTo(models.Event, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  Purchase.associate = function(models) {
    Purchase.belongsTo(models.Person, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Purchase.associate = function(models) {
    Purchase.belongsTo(models.Product, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Purchase;
};

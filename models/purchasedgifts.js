module.exports = function(sequelize, DataTypes) {
  const Purchasedgift = sequelize.define("Purchasedgift", {
    item: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    purchasedate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  Purchasedgift.associate = function(models) {
    Purchasedgift.belongsTo(models.Giftevent, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Purchasedgift;
};

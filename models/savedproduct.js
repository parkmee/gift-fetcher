module.exports = function(sequelize) {
  const Savedproduct = sequelize.define("Savedproduct", {});

  Savedproduct.associate = function(models) {
    Savedproduct.belongsTo(models.Contact, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Savedproduct.associate = function(models) {
    Savedproduct.belongsTo(models.Person, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Savedproduct.associate = function(models) {
    Savedproduct.belongsTo(models.Product, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Savedproduct;
};

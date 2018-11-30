module.exports = function(sequelize, DataTypes) {
  const Giftpreference = sequelize.define("Giftpreference", {
    item: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  });

  Giftpreference.associate = function(models) {
    Giftpreference.belongsTo(models.Person, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Giftpreference;
};

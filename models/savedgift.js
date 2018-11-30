module.exports = function(sequelize, DataTypes) {
  const Savedgift = sequelize.define("Savedgift", {
    item: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  });

  Savedgift.associate = function(models) {
    Savedgift.belongsTo(models.Person, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Savedgift;
};

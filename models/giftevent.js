module.exports = function(sequelize, DataTypes) {
  const Giftevent = sequelize.define("Giftevent", {
    description: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    eventdate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    notes: {
      type: DataTypes.STRING(500)
    }
  });

  Giftevent.associate = function(models) {
    Giftevent.belongsTo(models.Person, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Giftevent;
};

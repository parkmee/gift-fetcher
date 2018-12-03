module.exports = function(sequelize, DataTypes) {
  const Event = sequelize.define("Event", {
    description: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    eventDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Event.associate = function(models) {
    Event.belongsTo(models.Person, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Event;
};

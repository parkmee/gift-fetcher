module.exports = function(sequelize, DataTypes) {
  const Event = sequelize.define("Event", {
    description: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    eventdate: {
      type: DataTypes.DATEONLY,
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

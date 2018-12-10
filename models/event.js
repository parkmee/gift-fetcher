module.exports = function(sequelize, DataTypes) {
  const Event = sequelize.define("Event", {
    title: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
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
    },
    purchased: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    googleEventId: {
      type: DataTypes.STRING(150),
      allowNull: true
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

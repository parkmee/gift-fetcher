module.exports = function(sequelize, DataTypes) {
  const Holiday = sequelize.define("Holiday", {
    description: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  });

  return Holiday;
};

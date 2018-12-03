module.exports = function(sequelize, DataTypes) {
  const SavedDate = sequelize.define("SavedDate", {
    description: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    savedDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  SavedDate.associate = function(models) {
    SavedDate.belongsTo(models.Person, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return SavedDate;
};

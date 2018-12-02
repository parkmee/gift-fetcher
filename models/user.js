module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    userName: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Contact, {
      onDelete: "cascade"
    });
  };

  return User;
};

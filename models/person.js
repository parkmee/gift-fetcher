module.exports = function(sequelize, DataTypes) {
  const Person = sequelize.define("Person", {
    email: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(150)
    },
    address2: {
      type: DataTypes.STRING(150)
    },
    city: {
      type: DataTypes.STRING(150)
    },
    state: {
      type: DataTypes.STRING(2)
    },
    zipcode: {
      type: DataTypes.STRING(12)
    }
  });

  Person.associate = function(models) {
    Person.hasMany(models.Giftpreference, {
      onDelete: "cascade"
    });
  };

  Person.associate = function(models) {
    Person.hasMany(models.Savedgift, {
      onDelete: "cascade"
    });
  };

  return Person;
};

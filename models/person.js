module.exports = function(sequelize, DataTypes) {
  const Person = sequelize.define("Person", {
    email: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  });

  Person.associate = function(models) {
    Person.hasMany(models.Contact, {
      onDelete: "cascade"
    });
  };

  Person.associate = function(models) {
    Person.hasMany(models.Event, {
      onDelete: "cascade"
    });
  };

  Person.associate = function(models) {
    Person.hasMany(models.Giftpreference, {
      onDelete: "cascade"
    });
  };

  Person.associate = function(models) {
    Person.hasMany(models.Purchase, {
      onDelete: "cascade"
    });
  };

  Person.associate = function(models) {
    Person.hasMany(models.Savedproduct, {
      onDelete: "cascade"
    });
  };

  return Person;
};

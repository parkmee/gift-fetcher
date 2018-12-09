module.exports = function(sequelize, DataTypes) {
  const Person = sequelize.define("Person", {
    userName: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  });

  Person.associate = function(models) {
    Person.hasMany(models.GiftPreference, {
      onDelete: "cascade"
    });
  };

  Person.associate = function(models) {
    Person.hasMany(models.SavedDate, {
      onDelete: "cascade"
    });
  };

  Person.associate = function(models) {
    Person.hasMany(models.Purchase, {
      onDelete: "cascade"
    });
  };

  Person.associate = function(models) {
    Person.hasMany(models.SavedProduct, {
      onDelete: "cascade"
    });
  };

  Person.associate = function() {
    Person.belongsToMany(models.Event);
  };

  Person.associate = function() {
    Person.belongsToMany(Person, {
      as: "linkedPerson",
      through: "contacts"
    });
  };

  return Person;
};

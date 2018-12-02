module.exports = function(sequelize) {
  const Contact = sequelize.define("Contact", {});

  Contact.associate = function(models) {
    Contact.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Contact.associate = function(models) {
    Contact.belongsTo(models.Person, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Contact;
};

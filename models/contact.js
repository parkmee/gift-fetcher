module.exports = function(sequelize) {
  //module.exports = function(sequelize, DataTypes) {

  const Contact = sequelize.define("Contact", {
    // personId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
    // linkedPersonId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // }
  });

  Contact.associate = function(models) {
    Contact.belongsTo(models.Person, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Contact.associate = function(models) {
    Contact.belongsTo(models.Person, {
      as: "fk_linkedPersonId",
      foreignKey: "linkedPersonId",
      targetKey: "id"
    });
  };

  return Contact;
};

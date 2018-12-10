module.exports = function(sequelize, DataTypes) {
  const Contact = sequelize.define("Contact", {
    personId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    linkedPersonId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Contact;
};

const db = require("../models");

module.exports = function(app) {
  // get all contacts for the user
  app.get("/api/contact/getusercontacts/:userid", function(req, res) {
    db.Contact.findAll({ where: { userid: req.params.userid } }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // get one contact
  app.getOne("/api/contact/get/:contactid", function(req, res) {
    db.Contact.findAll({ where: { id: req.params.contactid } }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Create a new contact
  app.post("/api/contact/create", function(req, res) {
    db.Contact.create(req.body).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Delete a saved contact
  app.delete("/api/contact/:contactid", function(req, res) {
    db.Contact.destroy({ where: { id: req.params.contactid } }).then(function(dbData) {
      res.json(dbData);
    });
  });
};

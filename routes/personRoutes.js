const db = require("../models");

module.exports = function(app) {
  // get all people
  app.get("/api/person/get", function(req, res) {
    db.Person.findAll().then(function(dbData) {
      res.json(dbData);
    });
  });

  // get one
  app.get("/api/person/get/:personid", function(req, res) {
    db.Person.findOne({ where: { personid: req.params.personid } }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Create a new person
  app.post("/api/person/create", function(req, res) {
    db.Person.create(req.body).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Delete a person
  app.delete("/api/giftpreference/:personid", function(req, res) {
    db.Person.destroy({ where: { id: req.params.personid } }).then(function(dbData) {
      res.json(dbData);
    });
  });
};

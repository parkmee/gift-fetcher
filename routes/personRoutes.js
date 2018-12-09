const db = require("../models");

module.exports = function(app) {
  // get all people - don't think this is necessary
  // app.get("/api/person/get", function(req, res) {
  //   db.Person.findAll().then(function(dbData) {
  //     res.json(dbData);
  //   });
  // });

  // get one
  app.get("/api/person/:personid", function(req, res) {
    db.Person.findOne({ where: { id: req.params.personid } }).then(function(dbData) {
      res.json(dbData);
    });
  });

  app.get("/api/person/getPersonEvents/:personid/:createdby", function(req, res) {
    db.Person.findAll({
      where: { id: req.params.personid },
      include: [
        {
          model: db.Event,
          through: {
            attributes: ["title", "description", "eventDate", "purchased"],
            where: { createdBy: req.params.createdby }
          }
        }
      ]
    }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // get one
  app.get("/api/person/getpersonbyemail/:email", function(req, res) {
    db.Person.findOne({ where: { email: req.params.email } }).then(function(dbData) {
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
  app.delete("/api/person/:personId", function(req, res) {
    db.Person.destroy({ where: { id: req.params.personId } }).then(function(dbData) {
      res.json(dbData);
    });
  });
};

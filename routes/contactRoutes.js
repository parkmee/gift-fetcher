const db = require("../models");

module.exports = function(app) {
  // get all saved dates by person
  app.get("/api/contact/getbyperson/:personId", function(req, res) {
    db.Contact.findAll({
      where: { personId: req.params.personId },
      include: [
        {
          model: db.Person,
          as: "fk_linkedPersonId"
        }
      ]
    }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // get all saved dates by person
  app.get("/api/contact/getbypersonemail/:personemail", function(req, res) {
    db.Person.findOne({ where: { email: req.params.personemail } }).then(function(dbData) {
      db.Contact.findAll({
        where: { personId: dbData.id },
        include: [
          {
            model: db.Person,
            as: "fk_linkedPersonId"
          }
        ]
      }).then(function(dbData) {
        res.json(dbData);
      });
    });
  });

  // Create a new contact association
  app.post("/api/contact/create", function(req, res) {
    db.Contact.create(req.body).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Delete a saved gift
  app.delete("/api/contact/:personId/linkedPersonId", function(req, res) {
    db.Contact.destroy({
      where: { personId: req.params.personId, linkedPersonId: req.params.linkedPersonId }
    }).then(function(dbData) {
      res.json(dbData);
    });
  });
};

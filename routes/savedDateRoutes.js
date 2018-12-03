const db = require("../models");

module.exports = function(app) {
  // get all saved dates by person
  app.get("/api/savedDate/getbyperson/:personId", function(req, res) {
    db.SavedDate.findAll({ where: { personid: req.params.personId } }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // get saved date by id
  app.get("/api/savedDate/get/:savedDateid", function(req, res) {
    db.SavedDate.findAll({ where: { id: req.params.savedDateid } }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Create a new saved date
  app.post("/api/savedDate/create", function(req, res) {
    db.SavedDate.create(req.body).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Delete a saved gift
  app.delete("/api/savedDate/:savedDateid", function(req, res) {
    db.SavedDate.destroy({ where: { id: req.params.savedDateid } }).then(function(dbData) {
      res.json(dbData);
    });
  });
};

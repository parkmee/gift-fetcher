const db = require("../models");

module.exports = function(app) {
  // get all saved gifts by person
  app.get("/api/savedgift/getbyperson/:personid", function(req, res) {
    db.Savedgift.findAll({ where: { personid: req.params.personid } }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // don't think this is needed but adding for now
  // app.get("/api/savedgift/get/:savedgiftid", function(req, res) {
  //   db.Savedgift.findAll({ where: { id: req.params.savedgiftid } }).then(function(dbData) {
  //     res.json(dbData);
  //   });
  // });

  // Create a new saved gift
  app.post("/api/savedgift/create", function(req, res) {
    db.Savedgift.create(req.body).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Delete a saved gift
  app.delete("/api/savedgift/:savededgiftid", function(req, res) {
    db.Savedgift.destroy({ where: { id: req.params.savededgiftid } }).then(function(dbData) {
      res.json(dbData);
    });
  });
};

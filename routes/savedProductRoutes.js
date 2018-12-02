const db = require("../models");

module.exports = function(app) {
  // get all saved gifts by person
  app.get("/api/savedproduct/getbyperson/:personid", function(req, res) {
    db.Savedproduct.findAll({ where: { personid: req.params.personid } }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // get saved product by id
  app.get("/api/savedproduct/get/:savedproductid", function(req, res) {
    db.Savedproduct.findAll({ where: { id: req.params.savedproductid } }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Create a new saved gift
  app.post("/api/savedproduct/create", function(req, res) {
    db.Savedproduct.create(req.body).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Delete a saved gift
  app.delete("/api/savedproduct/:savededgiftid", function(req, res) {
    db.Savedproduct.destroy({ where: { id: req.params.savededgiftid } }).then(function(dbData) {
      res.json(dbData);
    });
  });
};

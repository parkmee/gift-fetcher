const db = require("../models");

module.exports = function(app) {
  // get all saved gifts by person
  app.get("/api/purchase/getbyperson/:personid", function(req, res) {
    db.Purchase.findAll({ where: { personid: req.params.personid } }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // get saved gift by purchaseid
  app.get("/api/purchase/get/:purchaseid", function(req, res) {
    db.Purchase.findOne({ where: { id: req.params.purchaseid } }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Create a new saved gift
  app.post("/api/purchase/create", function(req, res) {
    db.Purchase.create(req.body).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Delete a saved gift
  app.delete("/api/purchase/:purchaseid", function(req, res) {
    db.Purchase.destroy({ where: { id: req.params.purchaseid } }).then(function(dbData) {
      res.json(dbData);
    });
  });
};

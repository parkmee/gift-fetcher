const db = require("../models");

module.exports = function(app) {
  // get all gift events by person
  app.get("/api/giftpreference/getbyperson/:personid", function(req, res) {
    db.Giftpreference.findAll({ where: { personid: req.params.personid } }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Create a new saved gift
  app.post("/api/giftpreference/create", function(req, res) {
    db.Giftpreference.create(req.body).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Delete a saved gift
  app.delete("/api/giftpreference/:giftpreferenceid", function(req, res) {
    db.Giftpreference.destroy({ where: { id: req.params.savededgiftid } }).then(function(dbData) {
      res.json(dbData);
    });
  });
};

const db = require("../models");

module.exports = function(app) {
  // get all gift events by contact
  app.get("/api/giftpreference/getbycontact/:contactId", function(req, res) {
    db.GiftPreference.findAll({ where: { contactId: req.params.contactId } }).then(function(
      dbData
    ) {
      res.json(dbData);
    });
  });

  // get all gift events by person
  app.get("/api/giftpreference/getbyperson/:personId", function(req, res) {
    db.GiftPreference.findAll({ where: { personId: req.params.personId } }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Create a new saved gift preference
  app.post("/api/giftpreference/create", function(req, res) {
    db.GiftPreference.create(req.body).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Delete a saved gift
  app.delete("/api/giftpreference/:giftPreferenceId", function(req, res) {
    db.GiftPreference.destroy({ where: { id: req.params.giftPreferenceId } }).then(function(
      dbData
    ) {
      res.json(dbData);
    });
  });
};

const db = require("../models");

module.exports = function(app) {
  // get all purchase by person
  app.get("/api/purchase/getbyperson/:personId", function(req, res) {
    db.Purchase.findAll({ where: { personId: req.params.personId } }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // get all purchases by contact
  app.get("/api/purchase/getbycontact/:contactId", function(req, res) {
    db.Purchase.findAll({ where: { contactId: req.params.contactId } }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // get purchases by purchaseid
  app.get("/api/purchase/get/:purchaseid", function(req, res) {
    db.Purchase.findOne({ where: { id: req.params.purchaseid } }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Create a purchase
  app.post("/api/purchase/create", function(req, res) {
    db.Purchase.create(req.body).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Delete a saved purchase
  app.delete("/api/purchase/:purchaseId", function(req, res) {
    db.Purchase.destroy({ where: { id: req.params.purchaseId } }).then(function(dbData) {
      res.json(dbData);
    });
  });
};

const db = require("../models");

module.exports = function(app) {
  // get all saved gifts by person
  app.get("/api/savedproduct/getbycontact/:contactId", function(req, res) {
    db.SavedProduct.findAll({ where: { contactId: req.params.contactId } }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // get saved product by id
  app.get("/api/savedproduct/get/:savedProductId", function(req, res) {
    db.SavedProduct.findAll({ where: { id: req.params.savedProductId } }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Create a new saved gift
  app.post("/api/savedproduct/create", function(req, res) {
    db.SavedProduct.create(req.body).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Delete a saved gift
  app.delete("/api/savedproduct/:savedProductId", function(req, res) {
    db.SavedProduct.destroy({ where: { id: req.params.savedProductId } }).then(function(dbData) {
      res.json(dbData);
    });
  });
};

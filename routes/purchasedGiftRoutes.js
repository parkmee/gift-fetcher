/*
  Proposed Routes:
  POST    /api/purchasedgift/create                     create a purchasedgift
  GET     /api/purchasedgift/get/:purchasedgiftid       get a purchasedgift
  PUT     /api/purchasedgift/update/:purchasedgiftid    update a purchasedgift
  DELETE  /api/purchasedgift/delete/:purchasedgiftid    delete a purchasedgift
*/

const db = require("../models");

module.exports = function(app) {
  // get all saved gifts by person
  app.get("/api/purchasedgifts/getbyperson/:personid", function(req, res) {
    db.PurchasedGift.findAll({ where: { personid: req.params.personid } }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // don't think this is needed but adding for now
  /*app.get("/api/savedgift/get/:savedgiftid", function(req, res) {
    db.Savedgift.findAll({ where: { id: req.params.savedgiftid } }).then(function(dbData) {
      res.json(dbData);
    });
  });
  */

  // Create a new saved gift
  app.post("/api/purchasedgifts/create", function(req, res) {
    db.PurchasedGift.create(req.body).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Delete a saved gift
  app.delete("/api/purchasedgifts/:purchasedgiftid", function(req, res) {
    db.PurchasedGift.destroy({ where: { id: req.params.purchasedgiftid } }).then(function(dbData) {
      res.json(dbData);
    });
  });
};

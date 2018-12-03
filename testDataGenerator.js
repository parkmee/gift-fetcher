const db = require("../models");

module.exports = function createTestData() {
  // add sample saved products
  db.SavedProduct.create(req.body).then(function(dbData) {
    res.json(dbData);
  });
};

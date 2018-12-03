const db = require("../models");

module.exports = function(app) {
  // get all products should not be implemented as there might be MANY Products

  // get product by productid
  app.get("/api/product/:productId", function(req, res) {
    db.Product.findAll({ where: { id: req.params.productId } }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Create a new product
  app.post("/api/product/create", function(req, res) {
    db.Product.create(req.body).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Delete a product
  app.delete("/api/product/:productId", function(req, res) {
    db.Product.destroy({ where: { id: req.params.productId } }).then(function(dbData) {
      res.json(dbData);
    });
  });
};

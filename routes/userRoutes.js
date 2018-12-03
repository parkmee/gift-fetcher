const db = require("../models");

module.exports = function(app) {
  // get all users
  app.get("/api/user/get", function(req, res) {
    db.User.findAll({ where: { userid: req.params.userid } }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // get all contacts for the user
  app.get("/api/user/get/:userid", function(req, res) {
    db.User.findAll({ where: { userid: req.params.userid } }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Create a new user
  app.post("/api/user/create", function(req, res) {
    db.User.create(req.body).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Delete a saved user
  app.delete("/api/user/:userid", function(req, res) {
    db.User.destroy({ where: { id: req.params.userid } }).then(function(dbData) {
      res.json(dbData);
    });
  });
};

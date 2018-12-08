const db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/new-user", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("new-user", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/friend-list/:id", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("friend-list", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/profile", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("profile", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

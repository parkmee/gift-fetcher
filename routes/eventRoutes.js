const db = require("../models");

module.exports = function(app) {
  // get all gift events by person
  app.get("/api/event/getbyperson/:personid", function(req, res) {
    db.Event.findAll({ where: { personid: req.params.personid } }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // get all upcoming gift events
  app.get("/api/event/getupcoming/:windowdays", function(req, res) {
    db.Event.findAll({
      where: {
        eventdate: {
          $lte: moment()
            .subtract(req.params.windowdays, "days")
            .toDate()
        }
      }
    }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // get all gift events
  app.get("/api/event/get/", function(req, res) {
    db.Event.findAll().then(function(dbData) {
      res.json(dbData);
    });
  });

  // Create a new saved gift
  app.post("/api/event/create", function(req, res) {
    db.Event.create(req.body).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Delete a saved gift
  app.delete("/api/event/:savededgiftid", function(req, res) {
    db.Event.destroy({ where: { id: req.params.savededgiftid } }).then(function(dbData) {
      res.json(dbData);
    });
  });
};

const db = require("../models");

module.exports = function(app) {
  // get all gift events by person
  app.get("/api/giftevent/getbyperson/:personid", function(req, res) {
    db.Giftevent.findAll({ where: { personid: req.params.personid } }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // get all upcoming gift events
  app.get("/api/giftevent/getupcoming/:windowdays", function(req, res) {
    db.Giftevent.findAll({
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
  app.get("/api/giftevent/get/", function(req, res) {
    db.Giftevent.findAll().then(function(dbData) {
      res.json(dbData);
    });
  });

  // Create a new saved gift
  app.post("/api/giftevent/create", function(req, res) {
    db.Giftevent.create(req.body).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Delete a saved gift
  app.delete("/api/giftevent/:savededgiftid", function(req, res) {
    db.Giftevent.destroy({ where: { id: req.params.savededgiftid } }).then(function(dbData) {
      res.json(dbData);
    });
  });
};

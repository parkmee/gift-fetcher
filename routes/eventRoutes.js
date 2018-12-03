const db = require("../models");

module.exports = function(app) {
  // get all gift events by person
  app.get("/api/event/getpersonevents/:personId", function(req, res) {
    db.Event.findAll({ where: { personId: req.params.personId } }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // get all upcoming gift events
  app.get("/api/event/getupcoming/:windowDays", function(req, res) {
    db.Event.findAll({
      where: {
        eventdate: {
          $lte: moment()
            .subtract(req.params.windowDays, "days")
            .toDate()
        }
      }
    }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Create a new saved event
  app.post("/api/event/create", function(req, res) {
    db.Event.create(req.body).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Delete a saved gift
  app.delete("/api/event/:eventId", function(req, res) {
    db.Event.destroy({ where: { id: req.params.eventId } }).then(function(dbData) {
      res.json(dbData);
    });
  });
};

const db = require("../models");
const moment = require("moment");

module.exports = function(app) {
  // get all gift events by person id
  app.get("/api/event/getpersonevents/:personId", function(req, res) {
    db.Event.findAll({ where: { personId: req.params.personId } }).then(function(dbData) {
      res.json(dbData);
    });
  });

  app.get("/api/event/getcreatedbyevents/:createdBy", function(req, res) {
    db.Person.findOne({
      where: { id: req.params.createdBy }
    }).then(function(personData) {
      db.Event.findAll({
        where: { createdBy: req.params.createdBy }
      }).then(function(eventData) {
        personData = personData.toJSON();
        personData.events = eventData;
        res.json(personData);
      });
    });
  });

  app.get("/api/event/getupcomingevents/:createdBy", function(req, res) {
    db.Person.findOne({
      where: { id: req.params.createdBy }
    }).then(function(personData) {
      db.Event.findAll({
        where: {
          createdBy: req.params.createdBy,
          eventDate: {
            $between: [
              moment().toISOString(),
              moment()
                .add("days", 14)
                .toISOString()
            ]
          }
        }
      }).then(function(eventData) {
        personData = personData.toJSON();
        personData.events = eventData;
        res.json(personData);
      });
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

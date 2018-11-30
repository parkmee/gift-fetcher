/*
  Proposed Routes:
  POST    /api/holiday/create                       create a holiday
  GET     /api/holiday/get                          get all holidays
  GET     /api/holiday/get/:personid                get a holiday
  PUT     /api/holiday/update/:personid             update a holiday
  DELETE  /api/holiday/delete/:personid             delete a holiday
*/

const db = require("../models");

module.exports = function(app) {
  // get all holidays
  app.get("/api/holiday/get", function(req, res) {
    db.Holiday.findAll({}).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Create a holiday
  app.post("/api/holiday/create", function(req, res) {
    db.Holiday.create(req.body).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Update a holiday
  app.put("/api/holiday/:holidayid", function(req, res) {
    db.Holiday.update({ where: { id: req.params.holidayid } }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Delete a holiday
  app.delete("/api/holiday/:holidayid", function(req, res) {
    db.Holiday.destroy({ where: { id: req.params.holidayid } }).then(function(dbData) {
      res.json(dbData);
    });
  });
};

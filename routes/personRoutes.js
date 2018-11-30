/*
  Proposed Routes:
  POST    /api/person/create                        create a person
  GET     /api/person/get                           get all people
  GET     /api/person/get/:personid                 get a person
  PUT     /api/person/update/:personid              update a person
  DELETE  /api/person/delete/:personid              delete a person
*/

const db = require("../models");

module.exports = function(app) {
  // get all people
  app.get("/api/persons/get", function(req, res) {
    db.Person.findAll().then(function(dbData) {
      res.json(dbData);
    });
  });
  //
  // // get all gift events by person
  // app.get("/api/giftpreference/getbyperson/:personid", function(req, res) {
  //   db.Giftpreference.findAll({ where: { personid: req.params.personid } }).then(function(dbData) {
  //     res.json(dbData);
  //   });
  // });
  //
  // // Create a new saved gift
  // app.post("/api/giftpreference/create", function(req, res) {
  //   db.Giftpreference.create(req.body).then(function(dbData) {
  //     res.json(dbData);
  //   });
  // });
  //
  // // Delete a saved gift
  // app.delete("/api/giftpreference/:giftpreferenceid", function(req, res) {
  //   db.Giftpreference.destroy({ where: { id: req.params.savededgiftid } }).then(function(dbData) {
  //     res.json(dbData);
  //   });
  // });
};

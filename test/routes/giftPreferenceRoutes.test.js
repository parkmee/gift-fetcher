/* require("dotenv").config({
  path: __dirname + ".env"
});
var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request; */

// // TODO:  things to test
// /*

//     GET "/api/event/giftpreference/getbycontact/:personId/:createdBy"
//     POST "/api/giftpreference/create"
//     DELETE "/api/giftpreference/:giftPreferenceId"
// */

/* describe("GET //api/giftpreference/:personId/:createdBy", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function(done) {
    request = chai.request(server);
    db.sequelize.sync({ force: true }).then(function() {
      done();
    });
  });
});

it("should find all events by person id", function(done) {
  //Add some examples to the db to test with
  db.Event.bulkCreate([
    { description: "First Event", eventDate: "2019-01-01", PersonId: 1, createdBy: 1 },
    { description: "Second Event", eventDate: "2019-01-02", PersonId: 2, createdBy: 2 }
  ]).then(function() {
    //Request the route that returns all examples
    request.get("/api/event/getpersonevents/1").end(function(err, res) {
      var responseStatus = res.status;
      var responseBody = res.body;

      // Run assertions on the response

      expect(err).to.be.null;
      expect(responseStatus).to.equal(200);
      expect(responseBody[0])
        .to.be.an("object")
        .that.includes({
          description: "First Event",
          eventDate: "2019-01-01",
          PersonId: 1,
          createdBy: 1
        });

      //The `done` function is used to end any asynchronous tests
      done();
    });
  });
});
 */
/* //Test POST "/api/giftpreference/create"
  describe("POST /api/giftpreference/create", function() {
    // Before each test begins, create a new request server for testing
    // & delete all examples from the db
    beforeEach(function(done) {
      request = chai.request(server);
      db.sequelize.sync({ force: true }).then(function() {
        done();
      });
    });
  
    it("should save a person", function() {
        db.Person.create({
            userName: "userone",
            password: "secret",
            email: "userone@user.com",
            firstName: "User",
            lastName: "One"
        });

    it("should save an gift preference", function(done) {
      // Create an object to send to the endpoint
      var reqBody2 = {
        preference: "Electronics",
        PersonId: 1,
        createdBy: 1
      };

      // POST the request body to the server
      request
        .post("/api/giftpreference/create")
        .send(reqBody)
        .end(function(err, res) {
          var responseStatus = res.status;
          var responseBody = res.body;
  
          // Run assertions on the response
  
          expect(err).to.be.null;
  
          expect(responseStatus).to.equal(200);
  
          expect(responseBody)
            .to.be.an("object")
            .that.includes(reqBody);
  
          // The `done` function is used to end any asynchronous tests
          done();
        });
    });
  });
   */
/* //Test "DELETE "/api/event/:eventId"
  
  describe("DELETE /api/event/:eventId", () => {
    beforeEach(function(done) {
      request = chai.request(server);
      db.sequelize.sync({ force: true }).then(function() {
        done();
      });
    });
  
    it("it should create an event", function() {
      db.Event.create({
        description: "First Event",
        eventDate: "2018-12-15",
        PersonId: 1,
        createdBy: 1
      });
  
      it("should delete what was inserted", function() {
        request.delete("/api/event/1").end(function(err, res) {
          var responseStatus = res.status;
          expect(responseStatus).to.equal(200);
          expect(err).to.be.null;
        });
      });
  
      it("testing to see if inserted point is still there", function(done) {
        request.get("/api/event/1").end(function(err, res) {
          var responseStatus = res.status;
  
          // Run assertions on the response
  
          expect(err).to.be.null;
  
          expect(responseStatus).to.equal(404);
  
          done();
        });
      });
    });
  }); */

require("dotenv").config({
  path: __dirname + ".env"
});
var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../../server");
var db = require("../../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

// // TODO:  things to test
//

//     GET "/api/event/getpersonevents/:personId"
//     GET "/api/event/getupcoming/:windowDays"
//     POST "/api/event/create"
//     DELETE "/api/event/:eventId"

//Testing GET "/api/event/getpersonevents/:personId"
describe("GET /api/event/getpersonevents/:personId", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function(done) {
    request = chai.request(server);
    db.sequelize.sync({ force: true }).then(function() {
      done();
    });
  });

  it("it should return events by person", function() {
    db.Person.bulkCreate([
      {
        userName: "eventuserone",
        password: "secret",
        email: "eventuserone@user.com",
        firstName: "EventUser",
        lastName: "One"
      },
      {
        userName: "eventusertwo",
        password: "secret",
        email: "eventusertwo@user.com",
        firstName: "EventUser",
        lastName: "Two"
      }
    ]);

    it("should create events", function() {
      //Add some examples to the db to test with
      db.Event.bulkCreate([
        {
          description: "Test First Event",
          title: "Test First Event",
          eventDate: "2018-12-15",
          PersonId: 1,
          createdBy: 1
        },
        {
          description: " TestSecond Event",
          title: "Test Second Event",
          eventDate: "2019-01-01",
          PersonId: 2,
          createdBy: 2
        }
      ]);
    });

    it("it should return the event by person 1", function() {
      request.get("/api/event/getpersonevents/1").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;
        expect(responseStatus).to.equal(200);
        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({
            description: "Test First Event",
            eventDate: "2019-01-01",
            PersonId: 1,
            createdBy: 1
          });

        //The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});

//Testing GET "/api/event/getupcoming/:windowDays"
describe("GET /api/event/getupcoming/:windowDays", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function(done) {
    request = chai.request(server);
    db.sequelize.sync({ force: true }).then(function() {
      done();
    });
  });

  it("it should return events within 14 day window", function() {
    db.Person.bulkCreate([
      {
        userName: "userone",
        password: "secret",
        email: "userone@user.com",
        firstName: "User",
        lastName: "One"
      },
      {
        userName: "usertwo",
        password: "secret",
        email: "usertwo@user.com",
        firstName: "User",
        lastName: "Two"
      }
    ]);

    it("should create events", function() {
      //Add some examples to the db to test with
      db.Event.bulkCreate([
        {
          description: "First Event",
          title: "First Event",
          eventDate: "2018-12-15",
          PersonId: 1,
          createdBy: 1
        },
        {
          description: "Second Event",
          title: "Second Event",
          eventDate: "2019-01-01",
          PersonId: 2,
          createdBy: 1
        }
      ]);
    });

    it("it should return the event within a 14 day window", function() {
      request.get("/api/event/getupcoming/14").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;
        expect(responseStatus).to.equal(200);
        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({
            description: "First Event",
            eventDate: "2018-12-15",
            PersonId: 1,
            createdBy: 1
          });

        //The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});

//Test POST "/api/event/create"
describe("POST /api/event/create", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function(done) {
    request = chai.request(server);
    db.sequelize.sync({ force: true }).then(function() {
      done();
    });
  });

  it("should save an event", function(done) {
    //create a person first
    db.Person.create({
      userName: "user4delete",
      password: "secret",
      email: "user4delete@user.com",
      firstName: "Almost",
      lastName: "Gone"
    });

    // Create an object to send to the endpoint
    var reqBody = {
      description: "First Event",
      title: "First Event",
      eventDate: "2018-12-15",
      PersonId: 1,
      createdBy: 1
    };

    // POST the request body to the server
    request
      .post("/api/event/create")
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

// Test DELETE "/api/event/:eventId"
describe("DELETE /api/event/:eventId", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db

  beforeEach(function(done) {
    request = chai.request(server);
    db.sequelize.sync({ force: true }).then(function() {
      done();
    });
  });

  it("should delete an event", function() {
    //create a person first to satisfy table relationships

    db.Person.create({
      userName: "eventpersontobedeleted",
      password: "secret",
      email: "eventpersontobedeleted@user.com",
      firstName: "Michael",
      lastName: "Kelly"
    });

    //Add an event
    db.Event.create({
      description: "Delete Event",
      title: "Deleted Event",
      eventDate: "2018-12-15",
      PersonId: 1,
      createdBy: 1
    });

    request.delete("/api/person/1").end(function(err2, res2) {
      var responseStatus2 = res2.status;
      expect(responseStatus2).to.equal(200);
      expect(err2).to.be.null;
    });
    request.delete("/api/event/1").end(function(err1, res1) {
      var responseStatus1 = res1.status;
      expect(responseStatus1).to.equal(200);
      expect(err1).to.be.null;
    });

    request.get("/api/event/1").end(function(err, res) {
      var responseStatus = res.status;

      // Run assertions on the response

      expect(err).to.be.null;

      expect(responseStatus).to.equal(404);
      done();
    });
  });
});

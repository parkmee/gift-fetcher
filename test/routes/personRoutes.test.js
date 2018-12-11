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

// TODO:  things to test
/*
    GET "/api/person/:personid"
    GET "/api/person/getpersonbyemail/:email"
    POST "/api/person/create"
    DELETE "/api/person/:personId"
*/

//Test GET "/api/person/:personid""
describe("poersonRoute Tests", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function(done) {
    this.timeout(10000);
    request = chai.request(server);
    db.sequelize.sync({ force: true }).then(function() {
      done();
    });
  });

  it("should find person by person id", function() {
    db.Person.create({
      userName: "mygetbyperson",
      password: "secret",
      email: "mygetbyperson@user.com",
      firstName: "adam",
      lastName: "adams"
    });
    request.get("/api/person/1").end(function(err, res) {
      var responseStatus = res.status;
      var responseBody = res.body;

      // Run assertions on the response

      expect(err).to.be.null;

      expect(responseStatus).to.equal(200);

      expect(responseBody)
        .to.be.an("object")
        .that.includes({
          id: 1,
          userName: "mygetbyperson",
          password: "secret",
          email: "mygetbyperson@user.com",
          firstName: "adam",
          lastName: "adams"
        });
    });
  });
});

//Test GET "/api/person/getpersonbyemail/:email"
describe("GET /api/person/getpersonbyemail/:email", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function(done) {
    request = chai.request(server);
    db.sequelize.sync({ force: true }).then(function() {
      done();
    });
  });

  it("should find person by email", function(done) {
    // Add some examples to the db to test with
    db.Person.bulkCreate([
      {
        userName: "personuserone",
        password: "secret",
        email: "personuserone@user.com",
        firstName: "adam",
        lastName: "adams"
      },
      {
        userName: "personusertwo",
        password: "secret",
        email: "personusertwo@user.com",
        firstName: "bob",
        lastName: "barker"
      },
      {
        userName: "personuserthree",
        password: "secret",
        email: "personuserthree@user.com",
        firstName: "charles",
        lastName: "carter"
      }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/person/getpersonbyemail/personuserthree@user.com").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("object")
          .that.includes({
            id: 3,
            userName: "personuserthree",
            password: "secret",
            email: "personuserthree@user.com",
            firstName: "charles",
            lastName: "carter"
          });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});

//Test POST "/api/person/create"
describe("POST /api/person/create", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function(done) {
    request = chai.request(server);
    db.sequelize.sync({ force: true }).then(function() {
      done();
    });
  });

  it("should save a person", function(done) {
    // Create an object to send to the endpoint
    var reqBody = {
      userName: "createdperson",
      password: "secret",
      email: "createdperson@user.com",
      firstName: "Morgan",
      lastName: "Samuels"
    };

    // POST the request body to the server
    request
      .post("/api/person/create")
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
      });
    });
  });
  it("it should delete a person", function(done) {
    db.Person.create({
      userName: "tobedeleted",
      password: "secret",
      email: "tobedeleted@user.com",
      firstName: "John",
      lastName: "Doe"
    });
    request.delete("/api/person/1").end(function(err1, res1) {
      var responseStatus1 = res1.status;
      expect(responseStatus1).to.equal(200);
      expect(err1).to.be.null;

      request.get("/api/person/1").end(function(err, res) {
        var responseStatus = res.status;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(404);
      });
    });

    done();
  });

});

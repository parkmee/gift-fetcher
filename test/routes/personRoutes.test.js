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
    GET "/api/person/get/:personid"
    POST "/api/person/create"
    DELETE "/api/person/:personId"
*/

//Test GET "/api/person/get/:personid"
describe("GET /api/person", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function(done) {
    request = chai.request(server);
    db.sequelize.sync({ force: true }).then(function() {
      done();
    });
  });

  it("should find person by person id", function(done) {
    // Add some examples to the db to test with
    db.Person.bulkCreate([
      {
        userName: "userone",
        password: "secret",
        email: "userone@user.com",
        firstName: "adam",
        lastName: "adams"
      },
      {
        userName: "usertwo",
        password: "secret",
        email: "usertwo@user.com",
        firstName: "bob",
        lastName: "barker"
      },
      {
        userName: "userthree",
        password: "secret",
        email: "userthree@user.com",
        firstName: "charles",
        lastName: "carter"
      }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/person/2").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        // expect(responseBody)
        //   .to.be.an("array")
        //   .that.has.lengthOf(2);

        expect(responseBody)
          .to.be.an("object")
          .that.includes({
            id: 2,
            userName: "usertwo",
            password: "secret",
            email: "usertwo@user.com",
            firstName: "bob",
            lastName: "barker"
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
      userName: "userfour",
      password: "secret",
      email: "userfour@user.com",
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

        // The `done` function is used to end any asynchronous tests
        done();
      });
  });
});

//Test "DELETE /api/person/:id"
describe("DELETE /api/person/:id", () => {
  beforeEach(function(done) {
    request = chai.request(server);
    db.sequelize.sync({ force: true }).then(function() {
      done();
    });
  });

  it("it should create a person", function() {
    db.Person.create({
      userName: "userfive",
      password: "secret",
      email: "userfive@user.com",
      firstName: "John",
      lastName: "Doe"
    });

    it("should delete what was inserted", function() {
      request.delete("/api/person/1").end(function(err, res) {
        var responseStatus = res.status;
        expect(responseStatus).to.equal(200);
        expect(err).to.be.null;
      });
    });

    it("testing to see if inserted point is still there", function(done) {
      request.get("/api/person/1").end(function(err, res) {
        var responseStatus = res.status;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(404);

        done();
      });
    });
  });
});

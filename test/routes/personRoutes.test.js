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

  describe("GET /api/person/:personid ", function() {
    it("should find person by person id", function(done) {
      this.timeout(10000);
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
        // Request the route that returns a specific person
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

  //Test GET "/api/person/getpersonbyemail/:email"
  describe("GET /api/person/getpersonbyemail/:email", function() {
    it("should find person by email", function(done) {
      this.timeout(10000);
      // Add some examples to the db to test with
      db.Person.bulkCreate([
        {
          userName: "userfour",
          password: "secret",
          email: "userfour@user.com",
          firstName: "dixie",
          lastName: "daniels"
        },
        {
          userName: "userfive",
          password: "secret",
          email: "userfive@user.com",
          firstName: "erin",
          lastName: "echols"
        },
        {
          userName: "usersix",
          password: "secret",
          email: "usersix@user.com",
          firstName: "frank",
          lastName: "farmer"
        }
      ]).then(function() {
        // Request the route that returns all examples
        request.get("/api/person/getpersonbyemail/usersix@user.com").end(function(err, res) {
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
              id: 3,
              userName: "usersix",
              password: "secret",
              email: "usersix@user.com",
              firstName: "frank",
              lastName: "farmer"
            });

          // The `done` function is used to end any asynchronous tests
          done();
        });
      });
    });
  });
});

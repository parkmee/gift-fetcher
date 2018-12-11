/* require("dotenv").config({
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

//     GET "/api/contact/getbyperson/:personId"
//     GET "/api/contact/getbypersonemail/:personemail"
//     POST "/api/contact/create"
//     DELETE "/api/contact/:personId/linkedPersonId"

//Test GET "/api/person/:personid""
describe("GET /api/contact/getbyperson/:personId", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function(done) {
    request = chai.request(server);
    db.sequelize.sync({ force: true }).then(function() {
      done();
    });
  });

  it("should find CONTACT by person id", function() {
    db.Person.bulkCreate([
      {
        userName: "personcontactuserone",
        password: "secret",
        email: "personcontactuserone@user.com",
        firstName: "adam",
        lastName: "adams"
      },
      {
        userName: "personcontactusertwo",
        password: "secret",
        email: "personcontactusertwo@user.com",
        firstName: "bob",
        lastName: "barker"
      }
    ]);
    db.Contact.create({
      linkedPersonId: "1",
      PersonId: "1"
    });
    request.get("/api/contact/getbyperson/1").end(function(err, res) {
      var responseStatus = res.status;
      var responseBody = res.body;

      // Run assertions on the response

      expect(err).to.be.null;

      expect(responseStatus).to.equal(200);
      expect(responseBody).to.be.an("array");
      expect(responseBody[0]).that.includes({
        userName: "personcontactuserone",
        password: "secret",
        email: "personcontactuserone@user.com",
        firstName: "adam",
        lastName: "adams"
      });
    });
  });
});

//Test GET "/api/contact/getbypersonemail/:personemail"
describe("GET /api/contact/getbypersonemail/:personemail", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function(done) {
    request = chai.request(server);
    db.sequelize.sync({ force: true }).then(function() {
      done();
    });
  });

  it("should find CONTACT by email", function() {
    db.Person.bulkCreate([
      {
        userName: "emailcontactuser1",
        password: "secret",
        email: "emailcontactuser1@user.com",
        firstName: "adam",
        lastName: "adams"
      },
      {
        userName: "emailcontactuser2",
        password: "secret",
        email: "emailcontactuser2@user.com",
        firstName: "bob",
        lastName: "barker"
      }
    ]);
    db.Contact.create({
      linkedPersonId: "1",
      PersonId: "2"
    });

    request.get("/api/contact/getbypersonemail/emailcontactuser2@user.com").end(function(err, res) {
      var responseStatus = res.status;
      var responseBody = res.body;

      // Run assertions on the response

      expect(err).to.be.null;

      expect(responseStatus).to.equal(200);

      expect(responseBody).to.be.an("array");
      expect(responseBody[1]).that.includes({
        userName: "emailcontactuser2",
        password: "secret",
        email: "emailcontactuser2@user.com",
        firstName: "bob",
        lastName: "barker"
      });
    });
  });
});

//Test POST "/api/contact/create"
describe("POST /api/contact/create", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function(done) {
    request = chai.request(server);
    db.sequelize.sync({ force: true }).then(function() {
      done();
    });
  });

  it("should save a contact", function(done) {
    //create a person first
    db.Person.create({
      userName: "user4contactcreate",
      password: "secret",
      email: "user4contactcreate@user.com",
      firstName: "contact",
      lastName: "creation"
    });

    // Create an object to send to the endpoint
    var reqBody = {
      linkedPersonId: "1",
      PersonId: "1"
    };

    // POST the request body to the server
    request
      .post("/api/contact/create")
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

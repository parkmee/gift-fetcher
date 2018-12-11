/*require("dotenv").config({
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
// GET "/api/giftpreference/getbycreator/:createdBy"
// GET "/api/giftpreference/getbycreatoremail/:creatorEmail"
// GET "/api/giftpreference/getbyperson/:personId"
// GET "/api/giftpreference/getbypersonemail/:personEmail"
// POST "/api/giftpreference/:giftPreferenceId"
// DELETE "/api/giftpreference/:giftPreferenceId"

describe("GET /api/giftpreference/getbycreator/:createdBy", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function(done) {
    request = chai.request(server);
    db.sequelize.sync({ force: true }).then(function() {
      done();
    });
  });

  it("should find all gift preferences by createdBy", function(done) {
    db.Person.create({
      userName: "prefuserone",
      password: "secret",
      email: "prefuserone@user.com",
      firstName: "PrefUser",
      lastName: "One"
    });

    db.GiftPreference.bulkCreate([
      { preference: "Electronics", PersonId: 1, createdBy: 1 },
      { preference: "Orange Shoes", PersonId: 1, createdBy: 1 }
    ]);

    // POST the request body to the server
    request.get("/api/giftpreference/getbycreator/1").end(function(err, res) {
      var responseStatus = res.status;
      var responseBody = res.body;
      // Run assertions on the response
      expect(err).to.be.null;
      expect(responseStatus).to.equal(200);
      expect(responseBody)
        .to.be.an("array")
        .that.includes([
          { preference: "Electronics", PersonId: 1, createdBy: 1 },
          { preference: "Orange Shoes", PersonId: 1, createdBy: 1 }
        ]);
      // The `done` function is used to end any asynchronous tests
      done();
    });
  });
});
 */

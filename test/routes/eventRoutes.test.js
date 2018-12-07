// var chai = require("chai");
// var chaiHttp = require("chai-http");
// var server = require("../server");
// var db = require("../models");
// var expect = chai.expect;

// // Setting up the chai http plugin
// chai.use(chaiHttp);

// var request;

// // TODO:  things to test
// /*
//     GET "/api/event/getpersonevents/:personId"
//     GET "/api/event/getupcoming/:windowDays"
//     POST "/api/event/create"
//     DELETE "/api/event/:eventId"
// */

// describe("GET /api/event", function() {
//   // Before each test begins, create a new request server for testing
//   // & delete all examples from the db
//   beforeEach(function(done) {
//     request = chai.request(server);
//     db.sequelize.sync({ force: true }).then(function() {
//       done();
//     });
//   });

//   it("should find all events by person id", function(done) {
//     // Add some examples to the db to test with
//     db.Event.bulkCreate([
//       { description: "First Event", eventDate: "2019-01-01", PersonId: 1, createdBy: 1 },
//       { description: "Second Event", eventDate: "2019-01-02", PersonId: 2, createdBy: 2 }
//     ]).then(function() {
//       // Request the route that returns all examples
//       request.get("/api/event/getpersonevents/1").end(function(err, res) {
//         var responseStatus = res.status;
//         var responseBody = res.body;

//         // Run assertions on the response

//         expect(err).to.be.null;

//         expect(responseStatus).to.equal(200);

//         expect(responseBody)
//           .to.be.an("array")
//           .that.has.lengthOf(2);

//         expect(responseBody[0])
//           .to.be.an("object")
//           .that.includes({
//             description: "First Event",
//             eventDate: "2019-01-01",
//             PersonId: 1,
//             createdBy: 1
//           });

//         expect(responseBody[1])
//           .to.be.an("object")
//           .that.includes({
//             description: "Second Event",
//             eventDate: "2019-01-02",
//             PersonId: 2,
//             createdBy: 2
//           });

//         // The `done` function is used to end any asynchronous tests
//         done();
//       });
//     });
//   });
// });

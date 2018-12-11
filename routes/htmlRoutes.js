const path = require("path");
const TestData = require("../public/js/testdata.js");
const testEvents = TestData.testEvents;
require("../public/js/productGetter.js")();

// notes on importing functions: https://stackoverflow.com/questions/5797852/in-node-js-how-do-i-include-functions-from-my-other-files
// notes on async: https://stackoverflow.com/questions/46825735/how-do-i-stop-a-component-rendering-before-data-is-fetched

module.exports = function(app) {
  // Load index page

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/html/logon.html"));
  });

  app.get("/logon", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/html/logon.html"));
  });

  app.get("/profile", function(req, res) {
    console.log("user directed to /profile - email: ", req.user.email);
    res.sendFile(path.join(__dirname + "/../public/html/new-user.html"));
  });

  app.get("/index", function(req, res) {
    console.log("user directed to /index - email: ", req.user.email);
    // can autopopulate from google if we want
    // username:	req.user.email
    // firstname:  req.user.name.givenName
    // lastname:	req.user.name.familyName
    // email:		req.user.email;
    // googleId: 	req.user.id;

    let hbsObjects = {
      events: testEvents,
      // TODO: need help loading products from productGetter.js need async function
      products: ""
    };

    res.render("index", hbsObjects);
    //res.sendFile(path.join(__dirname + "/../public/html/index.html"));
  });

  app.get("/contacts", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/html/contacts.html"));
  });

  app.get("/new-user", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/html/new-user.html"));
  });

  app.get("/calendartest", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/html/mike-calendar.1.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

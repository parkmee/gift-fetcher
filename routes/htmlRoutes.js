const path = require("path");
const TestData = require("../public/js/testdata");
const testEvents = TestData.testEvents;

module.exports = function(app) {
  // Load index page

  app.get("/index", function(req, res) {
    const hbsObject = {
      events: testEvents
    };
    res.render("index", hbsObject);
  });

  /* app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/html/index.html"));
  }); */

  app.get("/friend-list", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/html/friend-list.html"));
  });

  app.get("/profile", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/html/profile.html"));
  });

  app.get("/new-user", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/html/new-user.html"));
  });

  app.get("/logon", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/html/logon.html"));
  });

  app.get("/calendartest", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/html/mike-calendar.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

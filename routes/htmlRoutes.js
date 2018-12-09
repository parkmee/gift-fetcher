const path = require("path");

module.exports = function(app) {
  // Load index page

  app.get("/logon", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/html/logon.html"));
  });

  app.get("/profile", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/html/new-user.html"));
  });

  app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/html/new-index.html"));
  });

  app.get("/calendartest", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/html/mike-calendar.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

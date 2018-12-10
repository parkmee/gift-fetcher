const path = require("path");

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
    res.sendFile(path.join(__dirname + "/../public/html/index.html"));
  });

  app.get("/calendartest", function(req, res) {
    console.log("user directed to /index - email: ", req.user.email);
    res.sendFile(path.join(__dirname + "/../public/html/mike-calendar.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

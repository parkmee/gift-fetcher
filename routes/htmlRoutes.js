const path = require("path");
const TestData = require("../public/js/testdata.js");
const testEvents = TestData.testEvents;
require("../public/js/productGetter.js")();

// notes on importing functions: https://stackoverflow.com/questions/5797852/in-node-js-how-do-i-include-functions-from-my-other-files
// notes on async: https://stackoverflow.com/questions/46825735/how-do-i-stop-a-component-rendering-before-data-is-fetched

module.exports = function (app) {
  // Load index page

  app.get("/index", function (req, res) {
    // TODO: retrieve currentUserId to populate upcoming events for that person
    //$.ajax("api/event/getcreatedbyevents/:createdBy", )

    async function loadData() {
      let promise = new Promise((resolve, reject) => {
        searchProducts("popular gifts", 20)
      });

      let products = await promise;

      res.render("index", {
        events: testEvents,
        products: products
      })
    }
    loadData();
  });

  /* app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/html/index.html"));
  }); */

  app.get("/contacts", function (req, res) {
    res.sendFile(path.join(__dirname + "/../public/html/contacts.html"));
  });

  app.get("/profile", function (req, res) {
    res.sendFile(path.join(__dirname + "/../public/html/profile.html"));
  });

  app.get("/new-user", function (req, res) {
    res.sendFile(path.join(__dirname + "/../public/html/new-user.html"));
  });

  app.get("/logon", function (req, res) {
    res.sendFile(path.join(__dirname + "/../public/html/logon.html"));
  });

  app.get("/calendartest", function (req, res) {
    res.sendFile(path.join(__dirname + "/../public/html/mike-calendar.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};

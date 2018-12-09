require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");

const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/public", express.static(__dirname + "/public"));

// Handlebars
app.engine("handlebars", exphbs({
  defaultLayout: "main",
  // Source - https://stackoverflow.com/questions/33059203/error-missing-helper-in-handlebars-js
  helpers: {
    // usage in handlebar: {{math @index "+" 1}}
    math: function (v1, operator, v2) {
      v1 = parseFloat(v1);
      v2 = parseFloat(v2);
      return {
        "+": v1 + v2,
        "-": v1 - v2,
        "*": v1 * v2,
        "/": v1 / v2,
        "%": v1 % v2
      }[operator];
    },
    // usage in handlebars: {{#if (compare v1 "===" v2)}}
    compare: function (v1, operator, v2) {
      v1 = v1.toLowerCase();
      v2 = v2.toLowerCase();
      return {
        "==": v1 == v2,
        "!=": v1 != v2,
        "===": v1 === v2,
        "<": v1 < v2,
        "<=": v1 <= v2,
        ">": v1 > v2,
        ">=": v1 >= v2,
        "&&": !!(v1 && v2),
        "||": !!(v1 || v2)
      }[operator];
    }
  }
}));
app.set("view engine", "handlebars");

// Routes
//require("./routes/apiRoutes")(app);
//require("./routes/htmlRoutes")(app);

require("./routes/eventRoutes")(app);
require("./routes/giftPreferenceRoutes")(app);
require("./routes/personRoutes")(app);
require("./routes/productRoutes")(app);
require("./routes/purchaseRoutes")(app);
require("./routes/savedDateRoutes")(app);
require("./routes/savedProductRoutes")(app);

require("./routes/htmlRoutes")(app);

const syncOptions = { force: false };

//test data generator
const TestData = require("./testDataGenerator");
td = new TestData();
// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

if (process.env.NODE_ENV === "development") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  td.createTestData();
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;

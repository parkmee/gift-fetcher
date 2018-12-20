require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
// eslint-disable-next-line no-unused-vars
//const { OAuth2Client } = require("google-auth-library");

const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;
const passport = require("passport");
// eslint-disable-next-line no-unused-vars
const passportSetup = require("./config/passportSetup");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

const authRoutes = require("./routes/authRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
const googleCalendarRoutes = require("./routes/googleCalendarRoute");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/public", express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// use cookies to control session
// set maxAge to 1 day
// cookie key secret saved in an environment var
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SESSION_KEY]
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// this can be called on a route to ensure the user is authenticated
// TODO: apply on all html routes
// TODO: figure out whatever is needed to apply to API routes too!
// const accessProtectionMiddleware = require("accessProtectionMiddleware");

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    // Source - https://stackoverflow.com/questions/33059203/error-missing-helper-in-handlebars-js
    helpers: {
      // usage in handlebar: {{math @index "+" 1}}
      math: function(v1, operator, v2) {
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
      compare: function(v1, operator, v2) {
        v1 = v1.toLowerCase();
        v2 = v2.toLowerCase();
        return {
          "==": v1 === v2,
          "!=": v1 !== v2,
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
  })
);
app.set("view engine", "handlebars");

// Routes
app.use("/auth", authRoutes);
require("./routes/eventRoutes")(app);
require("./routes/contactRoutes")(app);
require("./routes/giftPreferenceRoutes")(app);
require("./routes/personRoutes")(app);
require("./routes/productRoutes")(app);
require("./routes/purchaseRoutes")(app);
require("./routes/savedDateRoutes")(app);
require("./routes/savedProductRoutes")(app);
//app.use("/googleCalendarRoutes", googleCalendarRoutes);

//require("./routes/htmlRoutes")(app);
app.use("/", htmlRoutes);

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
db.sequelize.sync(syncOptions).then(function() {
  //td.createTestData();
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;

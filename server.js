require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");

const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;
const passport = require("passport");
//const util = require("util");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
//const RedisStore = require("connect-redis")(session);
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const GOOGLE_CLIENT_ID = "810303275752-m5egdhj3bgkra6ch90dq4tj9s0v7drep.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "UTA2TOU-tYzSSEYW3Bn_PaRz";
const SCOPES = ["https://www.googleapis.com/auth/calendar", "profile", "email"];

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

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_session_secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

// This will tell passport what to put into client-side cookies
// We are just saving the entire user object for this tutorial
// Normally, we'd usually want to save just a user_id
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((userDataFromCookie, done) => {
  done(null, userDataFromCookie);
});

// this can be called on a route to ensure the user is authenticated
// TODO: apply on all html routes
// TODO: figure out whatever is needed to apply to API routes too!
// const accessProtectionMiddleware = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.status(403).json({
//       message: "must be logged in to continue"
//     });
//   }
// };

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      scope: SCOPES
    },
    // This is a "verify" function required by all Passport strategies
    (accessToken, refreshToken, profile, cb) => {
      // console.log(
      //   "Google sent us back this profile info identifying the authenticated user:",
      //   profile
      // );
      return cb(null, profile);
    }
  )
);

app.get("/auth/google", passport.authenticate("google"));

// This is where Google sends users once they authenticate with Google
// Make sure this endpoint matches the "callbackURL" from step 4.2 and the "authorized redirect URI" from Step 3
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: true }),
  (req, res) => {
    //console.log("wooo we authenticated, here is our user object:", req.user);
    //res.json(req.user);
    db.Person.findOne({ where: { email: req.user.email } }).then(function(dbData) {
      if (dbData !== null) {
        // if user exist, send to index route
        res.redirect("/index");
      } else {
        // if user does NOT exist, send to profile route to create profile
        res.redirect("/profile");
        //res.redirect("/calendartest");
      }
    });
  }
);

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
require("./routes/eventRoutes")(app);
require("./routes/contactRoutes")(app);
require("./routes/giftPreferenceRoutes")(app);
require("./routes/personRoutes")(app);
require("./routes/productRoutes")(app);
require("./routes/purchaseRoutes")(app);
require("./routes/savedDateRoutes")(app);
require("./routes/savedProductRoutes")(app);
require("./routes/googleCalendarRoute")(app);

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

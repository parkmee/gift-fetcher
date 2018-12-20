const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const db = require("../models");

//const SCOPES = ["https://www.googleapis.com/auth/calendar", "profile", "email"];
const SCOPES = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email"
];

// once authenticated, save a cookie that contains the person id
passport.serializeUser((person, done) => {
  // create cookie with gift fetcher person id as content
  done(null, person.id);
});

// retrieve person id from cookie and lookup person
passport.deserializeUser((id, done) => {
  db.Person.findOne({ where: { id: id } }).then(function(dbData) {
    done(null, dbData);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_AUTH_CALLBACK,
      scope: SCOPES
    },
    // This is a "verify" function required by all Passport strategies
    (accessToken, refreshToken, profile, done) => {
      db.Person.findOne({ where: { googleId: profile.id } }).then(function(dbData) {
        if (dbData !== null) {
          // if person exist, send to index route
          console.log("person exists: ", dbData);
          done(null, dbData);
        } else {
          // if person does NOT exist, send to profile route to create profile
          db.Person.create({
            googleId: profile.id,
            userName: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value
          }).then(function(dbData) {
            console.log("new person created: ", dbData);
            done(null, dbData);
          });
        }
      });
    }
  )
);

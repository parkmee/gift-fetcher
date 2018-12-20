const router = require("express").Router();
const passport = require("passport");
const db = require("../models");

router.get("/logon", (req, res) => {
  // show the logon page
  res.render("logon");
});

router.get("/logout", (req, res) => {
  // logout user and redirect to /
  req.logOut();
  res.redirect("/");
});

// send user to google consent page to allow the app to authenticate the user
router.get(
  "/google",
  passport.authenticate("google", {
    accessType: "offline",
    prompt: "consent"
  })
);

// This is where Google sends users once they authenticate with Google
// Make sure this endpoint matches the "callbackURL" from step 4.2 and the "authorized redirect URI" from Step 3
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  // ///////res.redirect("/api/googlecalendar/getevents");

  db.Person.findOne({ where: { id: req.user.id } }).then(function(dbData) {
    // check to see if the person's profileSaved value is true.
    // if it is, then redirect to the index page.
    // if it is not then this is probably a newly-created user so
    // send to profile page to complete profile
    if (dbData.profileSaved) {
      // if user exist, send to index route
      res.redirect("/index");
      //res.redirect("/googleCalendarRoutes/getevents");
    } else {
      // if user does NOT exist, send to profile route to create profile
      res.redirect("/new-user");
    }
  });
});

module.exports = router;

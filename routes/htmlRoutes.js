const path = require("path");
const testData = require("../public/js/testdata.js");
const searchProducts = require("../public/js/productGetter.js");

// notes on importing functions: https://stackoverflow.com/questions/5797852/in-node-js-how-do-i-include-functions-from-my-other-files
// notes on async: https://stackoverflow.com/questions/46825735/how-do-i-stop-a-component-rendering-before-data-is-fetched

module.exports = function(app) {
  // Load index page

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/../public/html/logon.html"));
  });

  app.get("/logon", (req, res) => {
    res.sendFile(path.join(__dirname + "/../public/html/logon.html"));
  });

  app.get("/index", (req, res) => {
    //console.log("user directed to /index - email: ", req.user.email);
    // can autopopulate from google if we want
    // username:	req.user.email
    // firstname:  req.user.name.givenName
    // lastname:	req.user.name.familyName
    // email:		req.user.email;
    // googleId: 	req.user.id;

    function renderPage(hbsObjects) {
      res.render("index", hbsObjects);
    }

    function loadDataToIndex() {
      const contacts = testData.testContacts.sort(dynamicSort("lastName"));
      const events = testData.testEvents.sort(dynamicSort("eventDate"));
      console.log(testData.testContacts);
      console.log(testData.testEvents);

      let hbsObjects = {
        events: events,
        contacts: contacts,
        // TODO: need help loading products from productGetter.js need async function
        products: searchProducts("cat toys")
      };

      renderPage(hbsObjects);
    }
    loadDataToIndex();
  });

  app.get("/profile", (req, res) => {
    console.log("user directed to /profile - email: ", req.user.email);
    res.sendFile(path.join(__dirname + "/../public/html/new-user.html"));
  });

  app.get("/contacts", (req, res) => {
    function renderPage(hbsObjects) {
      res.render("contacts", hbsObjects);
    }

    function loadDataToContact() {
      const contacts = testData.testContacts.sort(dynamicSort("lastName"));
      const eventsByContact = "";
      const preferencesByContact = testData.testPreferences.sort(dynamicSort("preference"));
      const savedGiftsByContact = "";
      const purchasesByContact = "";
      console.log(contacts);
      console.log(eventsByContact);
      console.log(preferencesByContact);
      console.log(savedGiftsByContact);
      console.log(purchasesByContact);

      let hbsObjects = {
        events: eventsByContact,
        contacts: contacts,
        preferences: preferencesByContact,
        //products: searchProducts("cat toys"),
        savedGifts: savedGiftsByContact,
        purchases: purchasesByContact
      };

      renderPage(hbsObjects);
    }
    loadDataToContact();
  });

  app.get("/new-user", (req, res) => {
    function renderPage(hbsObjects) {
      res.render("new-user", hbsObjects);
    }

    function loadDataToSignIn() {
      const users = testData.testPerson.sort(dynamicSort("lastName"));
      const savedDates = testData.testSavedDates.sort(dynamicSort("description"));
      console.log(users);
      console.log(savedDates);

      let hbsObjects = {
        users: users,
        products: searchProducts("cat toys")
      };

      renderPage(hbsObjects);
    }
    loadDataToSignIn();
  });

  app.get("/calendartest", (req, res) => {
    res.sendFile(path.join(__dirname + "/../public/html/mike-calendar.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.render("404");
  });
};

// function to sort object by property
const dynamicSort = property => {
  let sortOrder = 1;

  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }

  return (a, b) => {
    if (sortOrder === -1) {
      return b[property].localeCompare(a[property]);
    } else {
      return a[property].localeCompare(b[property]);
    }
  };
};

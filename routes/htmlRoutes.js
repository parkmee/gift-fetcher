const router = require("express").Router();
const path = require("path");
const testData = require("../public/js/testdata.js");
const searchProducts = require("../public/js/productGetter.js");
const db = require("../models");
const moment = require("moment");
const accessProtectionMiddleware = require("../accessProtectionMiddleware");

//console.log("user directed to /index - email: ", req.user.email);
// can autopopulate from google if we want
// username:	req.user.email
// firstname:  req.user.name.givenName
// lastname:	req.user.name.familyName
// email:		req.user.email;
// googleId: 	req.user.id;

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

// get Contacts based on the Person ID passed in
// returns a promise
function getContacts(personId) {
  return new Promise(function(resolve, reject) {
    // FIRST check to see if there are any contacts for the person id
    // if there are none doing the join with fk_linkedPersonId
    // then do the join with the include
    db.Contact.findAll({
      where: { personId: personId }
    }).then(function(dbData) {
      console.log("dbData: ", dbData);
      if (dbData !== []) {
        db.Contact.findAll({
          //where: { personId: req.params.personId },
          where: { personId: personId },
          include: [
            {
              model: db.Person,
              as: "fk_linkedPersonId"
            }
          ],
          raw: true
        })
          .then(function(dbData) {
            resolve(dbData);
          })
          .catch(function(error) {
            reject(error);
          });
      } else {
        resolve([]);
      }
    });
  });
}

// get events based on the Person ID and number of days
// to look into the future, both are passed in
// returns a promise
function getEvents(personId, limitDays) {
  return new Promise(function(resolve, reject) {
    db.Event.findAll({
      where: {
        createdBy: personId,
        eventDate: {
          $between: [
            moment().toISOString(),
            moment()
              .add("days", limitDays)
              .toISOString()
          ]
        }
      },
      include: [
        {
          model: db.Person
        }
      ],
      raw: true
    })
      .then(function(dbData) {
        resolve(dbData);
      })
      .catch(function(error) {
        reject(error);
      });
  });
}

// get person based on the Person ID
// returns a promise
function getPersonInfo(personId) {
  return new Promise(function(resolve, reject) {
    db.Person.findOne({
      where: {
        personId: personId
      },
      raw: true
    })
      .then(function(dbData) {
        resolve(dbData);
      })
      .catch(function(error) {
        reject(error);
      });
  });
}

// get event data based on contact id
// returns a promise
function getEventsbyContactId(contactId) {
  return new Promise(function(resolve, reject) {
    db.Event.findAll({
      where: {
        personId: contactId,
        eventDate: {
          $between: [
            moment().toISOString(),
            moment()
              .add("days", limitDays)
              .toISOString()
          ]
        }
      },
      include: [
        {
          model: db.Person
        }
      ],
      raw: true
    })
      .then(function(dbData) {
        resolve(dbData);
      })
      .catch(function(error) {
        reject(error);
      });
  });
}

// Load logon page
router.get("/", (req, res) => {
  res.redirect("/auth/logon");
});

// render login page based on route.
// accessProtectionMiddleware redirects user to logon if they do not
// have a valid session
router.get("/index", accessProtectionMiddleware, (req, res) => {
  function renderPage(hbsObjects) {
    res.render("index", hbsObjects);
  }

  function loadDataToIndex() {
    let contacts = "";
    let events = "";

    getContacts(req.user.id).then(function(contactData) {
      contacts = contactData;
      getEvents(req.user.id, 14).then(function(eventData) {
        events = eventData;

        let hbsObjects = {
          events: events,
          contacts: contacts
          // TODO: need help loading products from productGetter.js need async function
          //products: searchProducts("cat toys")
        };
        renderPage(hbsObjects);
      });
    });
  }

  loadDataToIndex();
});

// render profile page based on route.
// accessProtectionMiddleware redirects user to logon if they do not
// have a valid session
router.get("/profile", accessProtectionMiddleware, (req, res) => {
  function renderPage(hbsObjects) {
    res.render("index", hbsObjects);
  }

  function loadDataToProfile() {
    let contacts = "";
    let events = "";
    db.Contact.findAll({
      //where: { personId: req.params.personId },
      where: { personId: 1 },
      include: [
        {
          model: db.Person,
          as: "fk_linkedPersonId"
        }
      ],
      raw: true
    }).then(function(dbData) {
      contacts = dbData;
      console.log(contacts);
      console.log(contacts[0]["fk_linkedPersonId.id"]);
      db.Event.findAll({
        where: {
          //createdBy: req.params.createdBy,
          createdBy: 1,
          eventDate: {
            $between: [
              moment().toISOString(),
              moment()
                .add("days", 14)
                .toISOString()
            ]
          }
        },
        include: [
          {
            model: db.Person
          }
        ],
        raw: true
      }).then(function(eventData) {
        events = eventData;
        console.log(events);

        let hbsObjects = {
          events: events,
          contacts: contacts
          // TODO: need help loading products from productGetter.js need async function
          //products: searchProducts("cat toys")
        };
        renderPage(hbsObjects);
      });
    });
  }
  loadDataToProfile();
});

// render contacts page based on route.
// accessProtectionMiddleware redirects user to logon if they do not
// have a valid session
router.get("/contacts", accessProtectionMiddleware, (req, res) => {
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

router.get("/new-user", accessProtectionMiddleware, (req, res) => {
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

router.get("/calendartest", accessProtectionMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/html/mike-calendar.html"));
});

// Render 404 page for any unmatched routes
router.get("*", (req, res) => {
  res.render("404");
});

module.exports = router;

const testEvents = [
  {
    personFirstName: "Mike",
    personLastName: "Kelley",
    eventCreatedBy: 1,
    eventTitle: "Birthday",
    eventDate: "12/17/2018",
    eventPurchased: true
  },
  {
    personFirstName: "Brintza",
    personLastName: "Miles",
    eventCreatedBy: 1,
    eventTitle: "Birthday",
    eventDate: "12/15/2018",
    eventPurchased: true
  },
  {
    personFirstName: "Richard",
    personLastName: "Whitner",
    eventCreatedBy: 1,
    eventTitle: "Wedding",
    eventDate: "12/25/2018",
    eventPurchased: false
  },
  {
    personFirstName: "Meeyoung",
    personLastName: "Park",
    eventCreatedBy: 1,
    eventTitle: "Christmas",
    eventDate: "12/25/2018",
    eventPurchased: true
  },
  {
    personFirstName: "Natalie",
    personLastName: "Portman",
    eventCreatedBy: 1,
    eventTitle: "Hanukkah",
    eventDate: "12/25/2018",
    eventPurchased: true
  },
  {
    personFirstName: "Nina",
    personLastName: "Dobrev",
    eventCreatedBy: 1,
    eventTitle: "Custom Event",
    eventDate: "12/25/2018",
    eventPurchased: false
  },
  {
    personFirstName: "Dave",
    personLastName: "Zee",
    eventCreatedBy: 1,
    eventTitle: "Graduation",
    eventDate: "12/25/2018",
    eventPurchased: true
  },
  {
    personFirstName: "Rupesh",
    personLastName: "Srinivasan",
    eventCreatedBy: 1,
    eventTitle: "Mother's Day",
    eventDate: "12/25/2018",
    eventPurchased: true
  }
];

const testContacts = [
  {
    personFirstName: "John",
    personLastName: "Adams"
  },
  {
    personFirstName: "Nina",
    personLastName: "Dobrev"
  },
  {
    personFirstName: "Don",
    personLastName: "Draper"
  },
  {
    personFirstName: "John",
    personLastName: "Doe"
  },
  {
    personFirstName: "Greg",
    personLastName: "Papadopolous"
  },
  {
    personFirstName: "Brintza",
    personLastName: "Miles"
  },
  {
    personFirstName: "Natalie",
    personLastName: "Portman"
  },
  {
    personFirstName: "Michael",
    personLastName: "Kelley"
  },
  {
    personFirstName: "Sastry",
    personLastName: "Satyanarayana"
  },
  {
    personFirstName: "Nani",
    personLastName: "Whitner"
  },
  {
    personFirstName: "Jesus",
    personLastName: "Christ"
  }
];

// test data to determine if only preferences for current user (2)
// and contact (1) are rendered
const testPreferences = [
  {
    personId: 1,
    preference: "cats",
    createdBy: 1
  },
  {
    personId: 1,
    preference: "books",
    createdBy: 1
  },
  {
    personId: 1,
    preference: "electronics",
    createdBy: 2
  },
  {
    personId: 1,
    preference: "cooking",
    createdBy: 2
  },
  {
    personId: 1,
    preference: "err1-wrong createdBy",
    createdBy: 3
  },
  {
    personId: 2,
    preference: "err2-wrong contact",
    createdBy: 1
  }
];

module.exports = {
  testContacts,
  testEvents,
  testPreferences
};

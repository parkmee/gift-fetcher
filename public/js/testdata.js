const testEvents = [
  {
    "Person.firstName": "Mike",
    "Person.lastName": "Kelley",
    createdBy: 1,
    title: "Birthday",
    eventDate: "12/17/2018",
    purchased: true
  },
  {
    "Person.firstName": "Brintza",
    "Person.lastName": "Miles",
    createdBy: 1,
    title: "Birthday",
    eventDate: "12/19/2018",
    purchased: true
  },
  {
    "Person.firstName": "Richard",
    "Person.lastName": "Whitner",
    createdBy: 1,
    title: "Wedding",
    eventDate: "12/25/2018",
    purchased: false
  },
  {
    "Person.firstName": "Meeyoung",
    "Person.lastName": "Park",
    createdBy: 1,
    title: "Christmas",
    eventDate: "12/25/2018",
    purchased: true
  },
  {
    "Person.firstName": "Natalie",
    "Person.lastName": "Portman",
    createdBy: 1,
    title: "Hanukkah",
    eventDate: "12/25/2018",
    purchased: true
  },
  {
    "Person.firstName": "Nina",
    "Person.lastName": "Dobrev",
    createdBy: 1,
    title: "Custom Event",
    eventDate: "12/25/2018",
    purchased: false
  },
  {
    "Person.firstName": "Dave",
    "Person.lastName": "Zee",
    createdBy: 1,
    title: "Graduation",
    eventDate: "12/25/2018",
    purchased: true
  },
  {
    "Person.firstName": "Rupesh",
    "Person.lastName": "Srinivasan",
    createdBy: 1,
    title: "Mother's Day",
    eventDate: "12/25/2018",
    purchased: true
  }
];

// construct data import to only include one instance of John Adams for linkedPersonId1
const testContacts = [
  {
    "fk_linkedPersonId.firstName": "John",
    "fk_linkedPersonId.lastName": "Adams",
    linkedPersonId: 1
  },
  {
    "fk_linkedPersonId.firstName": "John",
    "fk_linkedPersonId.lastName": "Adams",
    linkedPersonId: 2
  },
  {
    "fk_linkedPersonId.firstName": "Nina",
    "fk_linkedPersonId.lastName": "Dobrev",
    linkedPersonId: 1
  },
  {
    "fk_linkedPersonId.firstName": "Don",
    "fk_linkedPersonId.lastName": "Draper",
    linkedPersonId: 1
  },
  {
    "fk_linkedPersonId.firstName": "John",
    "fk_linkedPersonId.lastName": "Doe",
    linkedPersonId: 1
  },
  {
    "fk_linkedPersonId.firstName": "Greg",
    "fk_linkedPersonId.lastName": "Papadopolous",
    linkedPersonId: 1
  },
  {
    "fk_linkedPersonId.firstName": "Brintza",
    "fk_linkedPersonId.lastName": "Miles",
    linkedPersonId: 1
  },
  {
    "fk_linkedPersonId.firstName": "Natalie",
    "fk_linkedPersonId.lastName": "Portman",
    linkedPersonId: 1
  },
  {
    "fk_linkedPersonId.firstName": "Michael",
    "fk_linkedPersonId.lastName": "Kelley",
    linkedPersonId: 1
  },
  {
    "fk_linkedPersonId.firstName": "Sastry",
    "fk_linkedPersonId.lastName": "Satyanarayana",
    linkedPersonId: 1
  },
  {
    "fk_linkedPersonId.firstName": "Nani",
    "fk_linkedPersonId.lastName": "Whitner",
    linkedPersonId: 1
  },
  {
    "fk_linkedPersonId.firstName": "Jesus",
    "fk_linkedPersonId.lastName": "Christ",
    linkedPersonId: 1
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

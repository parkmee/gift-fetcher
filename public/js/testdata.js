const testEvents = [
  {
    firstName: "Mike",
    lastName: "Kelley",
    createdBy: 1,
    title: "Birthday",
    eventDate: "12/17/2018",
    purchased: true
  },
  {
    firstName: "Brintza",
    lastName: "Miles",
    createdBy: 1,
    title: "Birthday",
    eventDate: "12/19/2018",
    purchased: true
  },
  {
    firstName: "Richard",
    lastName: "Whitner",
    createdBy: 1,
    title: "Wedding",
    eventDate: "12/25/2018",
    purchased: false
  },
  {
    firstName: "Meeyoung",
    lastName: "Park",
    createdBy: 1,
    title: "Christmas",
    eventDate: "12/25/2018",
    purchased: true
  },
  {
    firstName: "Natalie",
    lastName: "Portman",
    createdBy: 1,
    title: "Hanukkah",
    eventDate: "12/25/2018",
    purchased: true
  },
  {
    firstName: "Nina",
    lastName: "Dobrev",
    createdBy: 1,
    title: "Custom Event",
    eventDate: "12/25/2018",
    purchased: false
  },
  {
    firstName: "Dave",
    lastName: "Zee",
    createdBy: 1,
    title: "Graduation",
    eventDate: "12/25/2018",
    purchased: true
  },
  {
    firstName: "Rupesh",
    lastName: "Srinivasan",
    createdBy: 1,
    title: "Mother's Day",
    eventDate: "12/25/2018",
    purchased: true
  }
];

// construct data import to only include one instance of John Adams for linkedPersonId1
const testContacts = [
  {
    firstName: "John",
    lastName: "Adams",
    linkedPersonId: 1
  },
  {
    firstName: "John",
    lastName: "Adams",
    linkedPersonId: 2
  },
  {
    firstName: "Nina",
    lastName: "Dobrev",
    linkedPersonId: 1
  },
  {
    firstName: "Don",
    lastName: "Draper",
    linkedPersonId: 1
  },
  {
    firstName: "John",
    lastName: "Doe",
    linkedPersonId: 1
  },
  {
    firstName: "Greg",
    lastName: "Papadopolous",
    linkedPersonId: 1
  },
  {
    firstName: "Brintza",
    lastName: "Miles",
    linkedPersonId: 1
  },
  {
    firstName: "Natalie",
    lastName: "Portman",
    linkedPersonId: 1
  },
  {
    firstName: "Michael",
    lastName: "Kelley",
    linkedPersonId: 1
  },
  {
    firstName: "Sastry",
    lastName: "Satyanarayana",
    linkedPersonId: 1
  },
  {
    firstName: "Nani",
    lastName: "Whitner",
    linkedPersonId: 1
  },
  {
    firstName: "Jesus",
    lastName: "Christ",
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

const testPerson = [
  {
    id: 1,
    userName: "user1",
    password: "",
    email: "user1@email.com",
    firstName: "Meeyoung",
    lastName: "Park",
    googleId: "123456"
  },
  {
    id: 2,
    userName: "user2",
    password: "",
    email: "user2@email.com",
    firstName: "Brintza",
    lastName: "Miles",
    googleId: "223456"
  },
  {
    id: 3,
    userName: "user3",
    password: "",
    email: "user3@email.com",
    firstName: "Meeyoung",
    lastName: "Park",
    googleId: "323456"
  }
];

testSavedDates = [
  {
    description: "Birthday",
    savedDate: "1/30/1982",
    personId: 1
  },
  {
    description: "Graduation",
    savedDate: "2/17/2019",
    personId: 1
  },
  {
    description: "Christmas",
    savedDate: "12/25/2018",
    personId: 1
  },
  {
    description: "Custom Date",
    savedDate: "1/1/2001",
    personId: 2
  }
];

module.exports = {
  testContacts,
  testEvents,
  testPreferences,
  testPerson,
  testSavedDates
};

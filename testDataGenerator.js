const db = require("./models");

class TestData {
  constructor() {
    // nothing to do here
  }

  createTestData() {
    db.Person.create({
      userName: "adam",
      password: "abcd1234",
      email: "adam@adam.com",
      firstName: "Adam",
      lastName: "Adams"
    });

    db.Person.create({
      userName: "barbara",
      password: "abcd1234",
      email: "barb@barbco.com",
      firstName: "Barbara",
      lastName: "Barnes"
    });

    db.Person.create({
      userName: "caron",
      password: "abcd1234",
      email: "ccarson@carsondesign.com",
      firstName: "Caron",
      lastName: "Carson"
    });

    db.Person.create({
      userName: "donna",
      password: "abcd1234",
      email: "donnan@danielscorp.com",
      firstName: "Donna",
      lastName: "Daniels"
    });

    db.Event.create({
      title: "Donna's Xmas",
      description: "Donna's Xmas",
      eventDate: "2018-12-25",
      createdBy: 1,
      PersonId: 4,
      purchased: true
    });

    db.Event.create({
      title: "Donna's Birthday",
      description: "Donna's Birthday",
      eventDate: "2019-01-01",
      createdBy: 1,
      PersonId: 4
    });

    db.Event.create({
      title: "Donna's Work Anniversary",
      description: "Donna's Work Anniversary",
      eventDate: "2019-02-05",
      createdBy: 1,
      PersonId: 4,
      purchased: true
    });

    db.Contact.create({
      PersonId: 1,
      linkedPersonId: 2
    });

    db.Contact.create({
      PersonId: 1,
      linkedPersonId: 3
    });

    db.Contact.create({
      PersonId: 1,
      linkedPersonId: 4
    });

    db.GiftPreference.create({
      preference: "pink",
      createdBy: 4,
      PersonId: 4
    });

    db.GiftPreference.create({
      preference: "cats",
      createdBy: 4,
      PersonId: 4
    });

    db.GiftPreference.create({
      preference: "sweaters",
      createdBy: 4,
      PersonId: 4
    });

    db.GiftPreference.create({
      preference: "earrings",
      createdBy: 1,
      PersonId: 4
    });

    db.Product.create({
      amazonId: "B07H3PL9FG",
      description: "fuzzy pink slippers",
      productUrl: "https://www.amazon.com/LongBay-Womens-Memroy-Slippers-Sandals/dp/B07H3MH8R5"
    });

    db.Product.create({
      amazonId: "B00RGI3GFA",
      description: "cat earrings",
      productUrl: "https://www.amazon.com/Crystal-Stud-Earrings-EGW156-Nickel/dp/B00RGI3GFA"
    });

    db.Product.create({
      amazonId: "B07J56MT38",
      description:
        "Forest Grass 4FT X 7FT Artificial Carpet Fake Grass Synthetic Thick Lawn Pet Turf",
      productUrl: "https://www.amazon.com/dp/B07J56MT38"
    });

    db.Product.create({
      amazonId: "B07DHW944X",
      description: "Salsa Sinaloa Steak Carne Asada Seasoning 12 oz",
      productUrl: "https://www.amazon.com/Salsa-Sinaloa-Steak-Carne-Seasoning/dp/B07DHW944X"
    });

    db.Product.create({
      amazonId: "B0784S2M1M",
      description: "pink cat sweater",
      productUrl: "https://www.amazon.com/Spotted-Zebra-French-Pullover-Hoodies/dp/B077SFZFJN"
    });

    db.Purchase.create({
      eventId: 1
    });

    db.Purchase.create({
      eventId: 3
    });

    db.SavedDate.create({
      description: "Work Anniversary",
      savedDate: "2018-12-18",
      createdBy: 4,
      PersonId: 4
    });

    db.SavedDate.create({
      description: "Work Anniversary",
      savedDate: "2018-12-20",
      createdBy: 2,
      PersonId: 4
    });

    db.SavedProduct.create({
      createdBy: 2,
      ProductId: 1,
      PersonId: 4
    });

    db.SavedProduct.create({
      createdBy: 4,
      ProductId: 4,
      PersonId: 4
    });
  }
}

module.exports = TestData;

const expect = require("chai").expect;
const Giftevent = require("../models/giftevent");

describe("canary test", function() {
  // A "canary" test is one we set up to always pass
  // This can help us ensure our testing suite is set up correctly before writing real tests
  it("should pass this canary test", function() {
    expect(true).to.be.true;
  });

  it("should fail this non-canary test", function() {
    //expect(Giftevent()).to.be.instanceof(Object);
    expect(false).to.be.true;
  });
});

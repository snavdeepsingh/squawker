var testLabelAnno = require("../src/labelAnnotations.js");
var expect = require("chai").expect;

describe("testLabelAnno", function() {
  it("should return the descriptions from the array of objects", function() {
    expect(testLabelAnno.visionQuery(testLabelAnno.sampleLabels[0])).to.equal(
      "bird"
      // [ 'bird', 'hawk', 'bird of prey', 'falcon', 'beak', 'fauna', 'buzzard', 'accipitriformes', 'eagle', 'wildlife' ]
      // "test"
  //     [ 'bird',
  // 'hawk',
  // 'bird of prey',
  // 'falcon',
  // 'beak',
  // 'fauna',
  // 'buzzard',
  // 'accipitriformes',
  // 'eagle',
  // 'wildlife' ]
    )
  });
});

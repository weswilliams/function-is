'use strict';

var finder = require('../finder');
var _ = require('underscore');

function max (x, y) {
  return x > y;
}

describe('repeat', function() {
  var blah = 'blah';
  finder.repeat(3, blah).should.matchEach(blah);
});

describe('finder', function() {
  it('should handle native values', function() {
    finder(max, [1,2,3,4,5]).should.equal(5);
  });

  it('should handle objects', function() {
    var agePlucker = finder.plucker('age');
    finder(function (x, y) { return max(agePlucker(x), agePlucker(y)); }, [
      {name: 'young', age: 1},
      {name: 'middle', age: 45},
      {name: 'old', age: 99}
    ]).age.should.equal(99);
  });
});
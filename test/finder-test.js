'use strict';

var finder = require('../finder');
var _ = require('underscore');

describe('finder', function() {
  it('should handle native values', function() {
    finder(_.identity, Math.max, [1,2,3,4,5]).should.equal(5);
  });

  it('should handle objects', function() {
    finder(finder.plucker('age'), Math.max, [
      {name: 'young', age: 1},
      {name: 'middle', age: 45},
      {name: 'old', age: 99}
    ]).age.should.equal(99);
  });
});
'use strict';

var finder = require('../finder');
var _ = require('underscore');

describe('finder', function() {
  it('should ', function() {
    finder(_.identity, Math.max, [1,2,3,4,5]).should.equal(5);
  });
});
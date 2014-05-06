'use strict';
var should = require('should');
var finder = require('../finder');
var checker = require('../checker');

describe('validator', function () {
  it('should return a function that execute a predicate function', function() {
    var validatorFun = checker.validator(null, finder.always(true));
    validatorFun().should.equal(true);
  });
});
'use strict';
var should = require('should');
var finder = require('../finder');
var checker = require('../checker');

describe('validator', function () {
  it('should return a function that execute a predicate function', function() {
    var validatorFun = checker.validator(null, finder.always(true));
    validatorFun().should.equal(true);
  });
  it('should pass arguments to predicate', function() {
    var validatorFun = checker.validator(null, function(arg) { return arg === 0; });
    validatorFun(0).should.equal(true);
  });
  it('should have a message property', function() {
    var message = 'message';
    checker.validator(message).message.should.equal(message);
  });
});
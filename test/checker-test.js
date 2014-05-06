'use strict';
var should = require('should');
var finder = require('../finder');
var checker = require('../checker');

describe('has keys', function () {
  it('should be true if an object has keys', function() {
    var keyValidator = checker.hasKeys('a', 'b');
    keyValidator({a: 1, b: 2}).should.equal(true);
  });
  it('should be false if an object is missing a key', function() {
    var keyValidator = checker.hasKeys('a', 'b');
    keyValidator({a: 1}).should.equal(false);
  });
  it('should message indicating required keys', function() {
    var keyValidator = checker.hasKeys('a', 'b');
    keyValidator.message.should.equal('Required keys: a b');
  });
});

describe('checker', function () {
  it('should have an empty list of errors when the only validator is true', function() {
    var checkerFun = checker(checker.validator('error', finder.always(true)));
    checkerFun().should.containDeep([]);
  });
  it('should have an error message when the only validator is false', function () {
    var checkerFun = checker(checker.validator('error', finder.always(false)));
    checkerFun().should.containDeep(['error']);
  });
  it('should handle multiple validators', function() {
    var checkerFun = checker(
      checker.validator('error', finder.always(false)),
      checker.validator('error2', finder.always(false)));
    checkerFun().should.containDeep(['error', 'error2']);
  });
});

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
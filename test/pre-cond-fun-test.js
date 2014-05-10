'use strict';

var conditionalFun = require('../conditional-functions');
var checker = require('../checker');
var _ = require('underscore');

var isNumber, isZero, myFun;

beforeEach(function () {
  isNumber = checker.validator('must be a number', _.isNumber);
  isZero = checker.validator('must be zero', function(n) { return n === 0; });
  myFun = function () { return _.toArray(arguments); };
});

describe('function with pre-conditions', function () {
  var preCondFun;
  beforeEach(function () {
    preCondFun = conditionalFun.preCondition(myFun, isNumber, isZero);
  });
  it('should return function results with no errors', function () {
    preCondFun(1, 0).should.containDeep([1,0]);
  });
  it('should throw exception with invalid first arg', function () {
    preCondFun.bind(null, 'x', 0).should.throw(isNumber.message);
  });
  it('should throw exception with invalid last arg', function() {
    preCondFun.bind(null, 1, 2).should.throw(isZero.message);
  });
  it('should throw exception for all invalid args', function () {
    preCondFun.bind(null, 'x', 2).should.throw([isNumber.message, isZero.message].join(', '));
  });
});

describe('function with post condition', function () {
  var isArray, postCondition;
  beforeEach(function () {
    postCondition = conditionalFun.postCondition;
    isArray = checker.validator('must return an array', _.isArray);
  });
  it('should return function call results if post condition met', function () {
    var postCondFun = postCondition(myFun, isArray);
    postCondFun(1).should.containDeep([1]);
  });
  it('should throw Error for invalid post condition', function () {
    var postCondFun = postCondition(myFun, isNumber);
    postCondFun.bind(1).should.throw(isNumber.message);
  });
  it('should throw Error for invalid post condition with multi-validation errors', function () {
    var postCondFun = postCondition(myFun, isNumber, isZero);
    postCondFun.bind(1).should.throw([isNumber.message, isZero.message].join(', '));
  });
});

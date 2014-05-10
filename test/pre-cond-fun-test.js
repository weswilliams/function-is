'use strict';

var conditionalFun = require('../conditional-functions');
var checker = require('../checker');
var _ = require('underscore');

var isNumber, isZero, myFun, myCondFun;

beforeEach(function () {
  isNumber = checker.validator('must be a number', _.isNumber);
  isZero = checker.validator('must be zero', function(n) { return n === 0; });
  myFun = function () { return _.toArray(arguments); };
  myCondFun = conditionalFun(myFun, isNumber, isZero);
});

describe('function with post condition', function () {
  it('should return function call results if post condition met', function () {
    var isArray = checker.validator('must return an array', _.isArray);
    var postCondFun = conditionalFun.postCondition(myFun, isArray);
    postCondFun(1).should.containDeep([1]);
  });
  it('should throw Error for invalid post condition', function () {
    var postCondFun = conditionalFun.postCondition(myFun, isNumber);
    postCondFun.bind(1).should.throw(isNumber.message);
  });
});
describe('function with pre-conditions', function () {
  it('should return function results with no errors', function () {
    myCondFun(1, 0).should.containDeep([1,0]);
  });
  it('should throw exception with invalid first arg', function () {
    myCondFun.bind(null, 'x', 0).should.throw(isNumber.message);
  });
  it('should throw exception with invalid last arg', function() {
    myCondFun.bind(null, 1, 2).should.throw(isZero.message);
  });
  it('should throw exception for all invalid args', function () {
    myCondFun.bind(null, 'x', 2).should.throw([isNumber.message, isZero.message].join(', '));
  });
});
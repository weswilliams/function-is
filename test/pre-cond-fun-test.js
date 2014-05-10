'use strict';

var conditionalFun = require('../conditional-functions');
var checker = require('../checker');
var _ = require('underscore');

var isNumber, isZero, myCondFun;

beforeEach(function () {
  isNumber = checker.validator('must be a number', _.isNumber);
  isZero = checker.validator('must be zero', function(n) { return n === 0; });
  var myFun = function () { return _.toArray(arguments); }
  myCondFun = conditionalFun(myFun, isNumber, isZero);
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
'use strict';

var conditionalFun = require('../conditional-functions');
var checker = require('../checker');
var _ = require('underscore');

var isNumber, isZero, isArray, myFun;

beforeEach(function () {
  isNumber = checker.validator('must be a number', _.isNumber);
  isZero = checker.validator('must be zero', function(n) { return n === 0; });
  isArray = checker.validator('must return an array', _.isArray);
  myFun = function () { return _.toArray(arguments); };
});

describe('pre and post conditional function', function () {
  it('should return value with no pre or post errors', function(){
    var preCondFun = conditionalFun.preCondition(myFun, isNumber);
    var prePostCondFun = conditionalFun.postCondition(preCondFun, isArray);
    prePostCondFun(1).should.containDeep([1]);
  });
  it('should throw pre errors', function(){
    var preCondFun = conditionalFun.preCondition(myFun, isNumber);
    var prePostCondFun = conditionalFun.postCondition(preCondFun, isArray);
    prePostCondFun.bind('x').should.throw(isNumber.message);
  });
  it('should throw post errors', function(){
    var preCondFun = conditionalFun.preCondition(myFun, isNumber);
    var prePostCondFun = conditionalFun.postCondition(preCondFun, isNumber);
    prePostCondFun.bind(1).should.throw(isNumber.message);
  });
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
  var postCondition;
  beforeEach(function () {
    postCondition = conditionalFun.postCondition;
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

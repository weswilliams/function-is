'use strict';

var conditionalFun = require('../conditional-functions');
var checker = require('../checker');
var _ = require('underscore');

describe('function with pre-conditions', function () {
  it('should throw exception with invalid arg', function () {
    var isNumber = checker.validator('must be a number', _.isNumber);
    var myFun = function (num) { return num; }
    var myCondFun = conditionalFun(myFun, isNumber);
    myCondFun.bind(null, 'x').should.throw();
  });
  it('should return function results with no errors', function () {
    var isNumber = checker.validator('must be a number', _.isNumber);
    var myFun = function (num) { return num; }
    var myCondFun = conditionalFun(myFun, isNumber);
    myCondFun(1).should.equal(1);
  });
});
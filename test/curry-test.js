'use strict';
var curry = require('../curry');
var should = require('should');
var _ = require('underscore');

describe('curry', function() {
  it('should execute a function with one variable', function () {
    curry(function(arg) { return arg; })(1).should.equal(1);
  });
  it('should get around optional parameter issues', function() {
    _.map(['11','11','11','11'], curry(parseInt)).should.containDeep([11,11,11,11]);
  });
});

describe('curry2', function () {
  it('should use a second parameter', function() {
    var divideBy10 = curry.curry2(function(n,d) { return n/d; })(10);
    divideBy10(50).should.equal(5);
  });
});
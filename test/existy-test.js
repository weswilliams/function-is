'use strict';
var should = require('should');
var _ = require('underscore');
var existy = require('../existy').existy;
var fnull = require('../existy').fnull;

describe('fnull', function () {
  it('should return a function that executes passed in function', function() {
    var newFun = fnull(function() { return _.toArray(arguments); });
    newFun(1,2,3).should.containDeep([1,2,3]);
  });
  it('should use default arguments for missing arguments', function() {
    var newFun = fnull(function() { return _.toArray(arguments); }, 1, 2, 3);
    newFun(null,undefined,3).should.containDeep([1,2,3]);
  });
});

describe('existy', function() {
  it('null should not be existy', function() {
    existy(null).should.equal(false);
  });
  it('undefined should not be existy', function() {
    existy(undefined).should.equal(false);
  });
  it('0 should be existy', function() {
    existy(0).should.equal(true);
  });
  it('false should be existy', function() {
    existy(false).should.equal(true);
  });
});
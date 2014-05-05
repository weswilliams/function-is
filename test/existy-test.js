'use strict';
var assert = require('assert');
var should = require('should');
var existy = require('../existy').existy;

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
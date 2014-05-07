'use strict';
var should = require('should');
var _ = require('underscore');
var invoker = require('../finder').invoker;
var dispatch = require('../dispatch');

describe('dispatch', function() {
  var dispatcher;
  beforeEach(function() {
    dispatcher = dispatch(
      invoker('toString', Array.prototype.toString),
      invoker('toString', String.prototype.toString)
    );
  });
  it('should return toString on a string', function() {
    dispatcher('a').should.equal('a');
  });
  it('should return toString on an Array', function () {
    dispatcher([1,2,3]).should.equal('1,2,3');
  });
});
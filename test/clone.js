'use strict';

var _ = require('underscore');
var deepClone = require('../clone');

describe('deep clone', function () {
  it('should create an object that is equal to the cloned one', function () {
    var x = [{ a: [1, 2, 3], b: 42}, {c: {d: []}}];
    var y = deepClone(x);
    _.isEqual(x, y).should.equal(true);
  });
  it('should allow obj and clone to change separately', function () {
    var x = [{ a: [1, 2, 3], b: 42}, {c: {d: []}}];
    var y = deepClone(x);
    x[1].c.d = 100000;
    _.isEqual(x, y).should.equal(false);
  });
});
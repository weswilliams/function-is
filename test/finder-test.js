'use strict';

var finder = require('../finder');
var _ = require('underscore');

function max (x, y) {
  return x > y;
}

describe('invoker', function() {
  it('should fail with no target', function() {
    finder.invoker('reverse', Array.prototype.reverse).bind(undefined).should.throw();
  });
  it('should execute function if it exists', function() {
    finder.invoker('reverse', Array.prototype.reverse)([1,2,3]).should.containDeep([3,2,1]);
  });
  it('should not try to execute a non existing function on target', function() {
    (finder.invoker('reverse', Array.prototype.reverse)({}) === undefined).should.be.true;
  });
});

describe('iterate until', function () {
  it('should stop based on function', function() {
    function double(n) { return n + n; }
    function upto(uptoN) { return function(n) { return n <= uptoN; }; }
    finder.iterateUntil(double, upto(8), 1).should.matchEach(/[2|4|8]/);
  });
});

describe('repeat', function() {
  it('should repeat a string', function() {
    var blah = finder.always('blah');
    finder.repeat(3, blah).should.matchEach(blah());
  });
  it('should pass a count', function() {
    finder.repeat(3, function (n) { return n; }).should.matchEach(/[0-3]/);
  });
});

describe('finder', function() {
  it('should handle native values', function() {
    finder(max, [1,2,3,4,5]).should.equal(5);
  });

  it('should handle objects', function() {
    var agePlucker = finder.plucker('age');
    finder(function (x, y) { return max(agePlucker(x), agePlucker(y)); }, [
      {name: 'young', age: 1},
      {name: 'middle', age: 45},
      {name: 'old', age: 99}
    ]).age.should.equal(99);
  });
});
'use strict';

var seq = require('../seq');

function fib(arg1, arg2) {
  return seq(arg1, seq.lazyInvoker(fib, arg2, arg1 + arg2));
}

beforeEach(function() {
});

describe('seq and take 1', function() {
  it('should take the first value in the seq', function() {
    seq.take(1, fib(1, 1)).should.containDeep([1]);
  });
  it('should take the first 2 values in the seq', function() {
    seq.take(2, fib(1,1)).should.containDeep([1,1]);
  });
  it('should take the first 10', function() {
    seq.take(10, fib(1,1)).should.containDeep([1,1,2,3,5,8,13,21,34,55]);
  });
});

describe('lazy invoker', function() {
  it('should return fun invocation value', function() {
    var fun = function(arg) { return arg; };
    seq.lazyInvoker(fun, 1)().should.equal(1);
  });
});
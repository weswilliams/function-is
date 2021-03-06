'use strict';

var seq = require('../seq');

function fib(arg1, arg2) {
  return seq(arg1, seq.lazyInvoker(fib, arg2, arg1 + arg2));
}

describe('cons', function() {
  it('should create a new seq with item as the first element', function () {
    var fibs = fib(1,1);
    seq.take(4, seq.cons(9, fibs)).should.containDeep([9,1,1,2]);
  });
});

describe('rest', function() {
  it('should create new seq stating at the second item of a seq', function () {
    seq.take(2, seq.rest(fib(1,1))).should.containDeep([1,2]);
  });
});

describe('first', function () {
  it('should return the first item in a seq', function() {
    seq.first(fib(1,1)).should.equal(1);
  });
  it('should work on seq returned from another seq function', function() {
    seq.first(seq.drop(2, fib(1,1))).should.equal(2);
  });
});

describe('drop', function() {
  it('should create a new seq n items into a seq', function() {
    var dropped = seq.drop(2, fib(1,1));
    seq.take(2, dropped).should.containDeep([2,3]);
  });
});

describe('takeN', function() {
  it('should find the first item in the seq', function() {
    seq.takeN(1, fib(1,1)).should.equal(1);
  });
  it('should find the second item in the seq', function() {
    seq.takeN(2, fib(1,1)).should.equal(1);
  });
  it('should find the 1000th item in the seq', function() {
    seq.takeN(100, fib(1,1)).should.equal(354224848179262000000);
  });
  // SLOW: this test seq takeN has tail call optimization
//  it('should not crash memory on a very big index', function() {
//    seq.takeN.bind(null, 100000000, fib(1,1)).should.not.throw();
//  });
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
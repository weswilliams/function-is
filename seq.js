'use strict';

var _ = require('underscore');

function seq(value, seqFun) {
  var fun = function() {
    return value;
  };
  fun.next = function() {
    return seqFun();
  };
  return fun;
}

function findN(n, seq) {
  var nth = seq, remaining = n-1;
  while (remaining > 0) { nth = nth.next(); remaining--; }
  return nth;
}

module.exports = seq;

module.exports.drop = function(n, seq) {
  return findN(n+1, seq);
};

module.exports.takeN = function(n, seq) {
  return findN(n, seq)();
};

module.exports.take = function(n, seq) {
  var nextSeq = seq;
  return _.map(_.range(n), function() {
    var value = nextSeq();
    nextSeq = nextSeq.next();
    return value;
  });
};

module.exports.lazyInvoker = function(fun) {
  var args = _.rest(arguments);
  return function() {
    return fun.apply(fun, args);
  };
};

module.exports.first = function(seq) {
  return seq();
};

module.exports.rest = function (seq) {
  return seq.next();
};
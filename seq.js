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

function findN(n, aSeq) {
  var nth = aSeq, remaining = n-1;
  while (remaining > 0) { nth = nth.next(); remaining--; }
  return nth;
}

module.exports = seq;

module.exports.drop = function(n, aSeq) {
  return findN(n+1, aSeq);
};

module.exports.takeN = function(n, aSeq) {
  return findN(n, aSeq)();
};

module.exports.take = function(n, aSeq) {
  var nextSeq = aSeq;
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

module.exports.first = function(aSeq) {
  return aSeq();
};

module.exports.rest = function (aSeq) {
  return aSeq.next();
};

module.exports.cons = function(item, aSeq) {
  return seq(item, seq.lazyInvoker(function () { return aSeq; }));
};
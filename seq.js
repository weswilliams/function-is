'use strict';

var _ = require('underscore');

function seq(value, seqFun) {
  var fun = function() {

  };
  fun.value = function() {
    return value;
  };
  fun.next = function() {
    return seqFun();
  };
  return fun;
}

module.exports = seq;

module.exports.take = function(n, seq) {
  var next = seq;
  return _.map(_.range(n), function() {
    var value = next.value();
    next = next.next();
    return value;
  });
};

module.exports.lazyInvoker = function(fun) {
  var args = _.rest(arguments);
  return function() {
    return fun.apply(fun, args);
  };
};
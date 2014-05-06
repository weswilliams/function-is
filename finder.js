'use strict';

var _ = require('underscore');

module.exports = function(fun, coll) {
  return _.reduce(coll, function (x, y) {
    return fun(x, y) ? x : y;
  });
};

module.exports.plucker = function(fieldName) {
  return function (obj) {
    return obj && obj[fieldName];
  };
};

module.exports.always = function (value) {
  return function() { return value; };
};

module.exports.repeat = function (times, fun) {
  return _.map(_.range(times), fun);
};

module.exports.iterateUntil = function (nextValue, check, init) {
  var values = [];
  var result = nextValue(init);
  while(check(result)) {
    values.push(result);
    result = nextValue(result);
  }
  return values;
};
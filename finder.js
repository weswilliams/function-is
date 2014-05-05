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
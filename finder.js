'use strict';

var _ = require('underscore');

module.exports = function(valueFun, bestFun, coll) {
  return _.reduce(coll, function (possibleBest, currentBest) {
    var possibleBestValue =  valueFun(possibleBest);
    var currentBestValue = valueFun(currentBest);
    return (possibleBestValue === (bestFun(possibleBestValue, currentBestValue)) ?
      possibleBest : currentBest);
  });
};

module.exports.plucker = function(fieldName) {
  return function (obj) {
    return obj && obj[fieldName];
  };
};
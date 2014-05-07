'use strict';

module.exports = function(fun) {
  return function(arg) {
    return fun(arg);
  };
};

module.exports.curry2 = function(fun) {
  return function(arg2) {
    return function(arg1) {
      return fun(arg1, arg2);
    };
  };
};
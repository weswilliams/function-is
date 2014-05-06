'use strict';

var _ = require('underscore');
var existy = require('./existy');

module.exports = function(fun, coll) {
  return _.reduce(coll, function (x, y) {
    return fun(x, y) ? x : y;
  });
};

module.exports.invoker = function(name, method) {
  return function(target) {
    if (!existy.existy(target)) { fail('Must provide a target'); }
    var targetMethod = target[name];
    return existy.doWhen(existy.existy(targetMethod) && method === targetMethod,
      function() {
        return method.apply(target, _.rest(arguments));
      });
  };
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
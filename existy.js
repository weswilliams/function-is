'use strict';

var _ = require('underscore');

function existy(x) { return x != null; }

function truthy(x) { return (x !== false) && existy(x); }

function fnull(fun) {
  var defaults = _.rest(arguments);
  return function() {
    var args = _.map(arguments, function(arg, index) {
      return existy(arg) ? arg : defaults[index];
    });
    return fun.apply(null, args);
  };
}

function doWhen(condition, action) {
  if(truthy(condition)) {
    return action();
  }
  return undefined;
}

function complement(pred) {
  return function() {
    return !pred.apply(null, _.toArray(arguments));
  };
}

function allOf(/* funcs */) {
  return _.reduceRight(arguments, function(truth, f) {
    return truth && f();
  }, true);
}

function anyOf(/* funcs */) {
  return _.reduceRight(arguments, function(truth, f) {
    return truth || f();
  }, false);
}

module.exports = function(target) {
  target.apply(null, [module.exports.existy]);
};
module.exports.existy = existy;
module.exports.truthy = truthy;
module.exports.allOf = allOf;
module.exports.doWhen = doWhen;
module.exports.fnull = fnull;


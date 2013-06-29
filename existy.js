var _und = require('underscore');

function existy(x) { return x != null; }

function truthy(x) { return (x !== false) && existy(x); }

function allOf(/* funcs */) {
  return _und.reduceRight(arguments, function(truth, f) {
    return truth && f();
  }, true);
}

function anyOf(/* funcs */) {
  return _und.reduceRight(arguments, function(truth, f) {
    return truth || f();
  }, false);
}

module.exports.existy = existy;
module.exports.truthy = truthy;

'use strict';
var _ = require('underscore');
var existy = require('./existy').existy;
var construct = require('./db').construct;

module.exports = function dispatch(/* funs */) {
  var funs = _.toArray(arguments);
  var size = funs.length;
  return function (target /*, args */) {
    var ret = undefined;
    var args = _.rest(arguments);
    for (var funIndex = 0; funIndex < size; funIndex++) {
      var fun = funs[ funIndex];
      ret = fun.apply(fun, construct(target, args));
      if (existy(ret)) { return ret; }
    }
    return ret;
  };
};

'use strict';

var dispatch = require('./dispatch');
var invoker  =require('./finder').invoker;

function always(fun) {
  return function() {
    return fun;
  };
}

module.exports = function(fun) {
  return function(arg) {
    return fun(arg);
  };
};

module.exports.curryN = function(curryArgCnt, fun) {
  var remainingCurryArgCnt = curryArgCnt, args = [];
  var nextRemaining = function() {
    var o = {};
    o['' + remainingCurryArgCnt--] = getCurried;
    return o;
  };
  var nextArg = function(arg) {
    args.push(arg);
    return dispatcher(nextRemaining());
  };
  var curried = function(arg) {
    nextArg(arg);
    return fun.apply(fun, args.reverse());
  };
  var getCurried = function() { return curried; };
  var dispatcher = dispatch(invoker('1', getCurried), always(nextArg));
  return dispatcher(nextRemaining());


//  return nextArgOrCurry(nextArg, curried);
};

module.exports.curry2 = function(fun) {
  return function(arg2) {
    return function(arg1) {
      return fun(arg1, arg2);
    };
  };
};
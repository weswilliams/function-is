'use strict';

module.exports = function(fun) {
  return function(arg) {
    return fun(arg);
  };
};

module.exports.curryN = function(curryArgCnt, fun) {
  var remainingCurryArgCnt = curryArgCnt;
  var args = [];
  var nextArgOrCurry = function(nextArg, curried) {
    --remainingCurryArgCnt;
    if (remainingCurryArgCnt >= 1) {
      console.log('nextArg');
      return nextArg;
    }
    console.log('curried');
    return curried;
  };
  var nextArg = function(arg) {
    args.push(arg);
    return nextArgOrCurry(nextArg, curried);
  };
  var curried = function(arg) {
    nextArg(arg);
    return fun.apply(fun, args.reverse());
  };
  return nextArgOrCurry(nextArg, curried);
};

module.exports.curry2 = function(fun) {
  return function(arg2) {
    return function(arg1) {
      return fun(arg1, arg2);
    };
  };
};
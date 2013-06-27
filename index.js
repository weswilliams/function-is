_ = require('underscore');
existy = require('./existy.js');

function not(pred) {
  return function(x,y) {
    return !pred(x,y);
  };
}

function or() {
  var preds = arguments;
  return function(x, y) {
    return _.reduce(preds, function(memo, pred) { return memo || pred(x,y); }, false);
  };
}

function lessThan(x, y) {
  return x < y;
}

var greaterThan = not(lessThan);

function comparator(pred) {
  return function(x, y) {
    if (existy.truthy(pred(x,y)))
      return -1;
    else if (existy.truthy(pred(y,x)))
      return 1;
    else
      return 0;
  };
}

array = [2,3,-1,-6,0,-100,42,10];

console.log(array.sort(comparator(lessThan)));

console.log(array.sort(comparator(greaterThan)));

console.log(array.sort(comparator(or(lessThan, _.isEqual))));

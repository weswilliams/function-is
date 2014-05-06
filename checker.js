'use strict';

module.exports.validator = function(message, predicate) {
  var fun = function() {
    return predicate.apply(null, arguments);
  };
  fun.message = message;
  return fun;
};
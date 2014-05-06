'use strict';

module.exports.validator = function(message, predicate) {
  return function() {
    return predicate.apply(null, arguments);
  };
};
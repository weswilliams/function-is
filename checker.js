'use strict';

var _ = require('underscore');

module.exports = function() {
  var validators = _.toArray(arguments);
  return function (obj) {
    return _.reduce(validators, function(errors, validator) {
      if (validator(obj)) { return errors; }
      return _.chain(errors).push(validator.message).value();
    }, []);
  };
};

module.exports.validator = function(message, predicate) {
  var fun = function() {
    return predicate.apply(null, arguments);
  };
  fun.message = message;
  return fun;
};
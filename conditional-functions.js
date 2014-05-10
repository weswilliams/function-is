'use strict';

var _ = require('underscore');

module.exports = function(fun /* arguments */) {
  var argValidators = _.rest(arguments);
  return function(/* arguments */) {
    var funArgs = _.toArray(arguments);
    var errors = _.chain(argValidators).map(function(validator, index) {
      return validator(funArgs[index]) ? undefined : validator.message;
    }).compact().value();
    if (errors.length > 0) { throw new Error(errors.join(', ')); }
    return fun.apply(fun, funArgs);
  };
};
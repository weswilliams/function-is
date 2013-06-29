var _und = require('underscore');
require('./existy.js')(function() {

function cat() {
  var head = _und.first(arguments);
  if (existy(head))
    return head.concat.apply(head, _und.rest(arguments));
  else
    return [];
}

console.log(cat([1,2],[2,3]));
});


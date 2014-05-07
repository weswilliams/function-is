var _und = require('underscore');
require('./existy.js')(function(existy) {

function cat() {
  var head = _und.first(arguments);
  if (existy(head))
    return head.concat.apply(head, _und.rest(arguments));
  else
    return [];
}

function construct(head, tail) {
  return cat([head], _und.toArray(tail));
}

function mapcat(func, coll) {
  return cat.apply(null, _und.map(coll, func));
}

function butLast(coll) {
  return _und.toArray(coll).slice(0,-1);
}

function interpose(inter, coll) {
  return butLast(mapcat(function(e) {
    return construct(e, [inter]);
  }, coll));
}

function project(table, keys) {
  return _und.map(table, function(obj) {
    return _und.pick.apply(null, construct(obj, keys));
  });
}

var library = [ 
  {title: "SICP", isbn: "0262010771", ed: 1},
  {title: "SICP", isbn: "0262510871", ed: 2},
  {title: "Joy of Clojure", isbn: "1935182641", ed: 1}
];

console.log(project(library, ['title', 'isbn']));

module.exports.construct = construct;
module.exports.cat = cat;
module.exports.mapcat = mapcat;
module.exports.butLast = butLast;
module.exports.iterpose = interpose;
  
});


var _ = require('underscore');

function lamecsv(str) {
  return _.reduce(str.split("\n"), function(table, row) {
    table.push(_.map(row.split(","), function(c) {
      return c.trim(); 
    }));
    return table;
  }, []);
}

function isIndexed(data) {
  return _.isArray(data) || _.isString(data);
}

function nth(data, index) {
  if (!_.isNumber(index)) fail("Expected a number as the index");
  if (!isIndexed(data)) fail("Not supported on non-indexed type");
  if ((index < 0) || (index > data.length - 1)) fail("Index value is out of bounds"); 
  return data[index]; 
}

function columnAccessor(col) {
  return function(row) {
    return nth(row, col);
  };
}

function second() { return columnAccessor(2); }

function names(table) {
  return _.rest(_.map(table, _.first));
}

function ages(table) {
  return _.rest(_.map(table, second()));
}

var people = lamecsv("name,age,hair\nmerble,35,red\nbob,64,blonde");
console.log(people);

console.log(_.rest(people).sort());

console.log(names(people));

console.log(ages(people));

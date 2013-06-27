_ = require('underscore');

function lamecsv(str) {
  return _.reduce(str.split("\n"), function(table, row) {
    table.push(_.map(row.split(","), function(c) {
      return c.trim(); 
    }));
    return table;
  }, []);
}

function nth(row, num) { return row[num]; }

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

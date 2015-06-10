var datashape = require('./datashape.js');
var sampledata = require('./example/sampledata.json');
var util = require('util');

var shape = {
  _id: datashape.first,
  friends: {
    id: 0,
    name: datashape.stringstats
  },
  about: datashape.stringstats,
  age: datashape.stats,
};
datashape.datashape(sampledata, shape);

console.log(util.inspect(shape, {showHidden: false, depth: null}));

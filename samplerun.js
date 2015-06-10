var datashape = require('./datashape.js');
var sampledata = require('./example/sampledata.json');
var util = require('util');

var shape = {};
datashape(sampledata, shape);

console.log(util.inspect(shape, {showHidden: false, depth: null}));

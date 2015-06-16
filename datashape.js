var _ = require('lodash');


// Helper functions for data shape analysis
// Probably a better way to load these in, but for now this works quickly
var stats = require('./functions/stats/numstats');
var stringstats = require('./functions/stats/stringstats');
var datestats = require('./functions/stats/datestats');
var ordinal = require('./functions/ordinal'); // for .first and .last
var distinct = require('./functions/distinct');
var objtype = require('./functions/objtype');
var util = require('util');





function recursionPolice(recurseLevel, maxLevel) {
    recurseLevel = recurseLevel || 0;
    maxLevel = maxLevel || 50;

    recurseLevel++;
    if (recurseLevel > maxLevel) {
      throw new Error('Recursion depth has been exceeded');
    }

    return recurseLevel;

}


function getDataShape(obj, sub, nestlevel) {


        //First thing we want to test: Did somebody pass us a filename?
        if ( _.isString(obj) && !nestlevel) {
          var jsonutil = require('jsonutil');
          dataModel = jsonutil.readFileSync(obj);
          getDataShape(dataModel, sub);
          return sub;
        }

        //Some Recursion Police Work. Don't go beyond 50 nested levels
        nestlevel = recursionPolice(nestlevel, 50); //Throw an exception if we exceed depth of 50


        //Determine keyValues in the object we are looking out
        var keyValues = _.map(obj, function(v,i) { return i;}); //This works for arrays too.
        var parentIsArray = _.isArray(obj);


        //Iterate through the keys
        for (var ki in keyValues) {

          var kName = keyValues[ki];


          //Do we have nested object?
          if (_.isObject(obj[kName])) {
                //what to do if we encounter a sub-object
                var subObj = obj[kName];


                //Do we need to generate 'sub'?
                if (parentIsArray) {
                  if (!sub) { sub = {}; }
                  getDataShape(subObj, sub, nestlevel);

                }
                else {
                  if (!sub[kName]) { sub[kName] = {};}
                  getDataShape(subObj, sub[kName], nestlevel);
                }



          }

          //The object we see isn't a nested object.
          else {
                if (!sub) { sub = {}; }

                if (sub[kName] === undefined) { sub[kName] = {}; }



                if (_.isNumber(sub[kName])) {
                  //The shape template was populated with an integer. Let's count all the things
                    sub[kName]++;
                }

                else if (sub[kName] === null) {
                    //no-op
                }

                else if (_.isFunction(sub[kName])) {




                  try {
                    sub[kName +'_data'] = sub[kName](obj[kName], sub[kName + '_data']);
                  }
                  catch (ex) {
                    console.error(ex);
                  }

                }

                else {



                    var linkval = obj[kName];




                    if (Object.keys(sub[kName]).length <= 500) {
                        if (!sub[kName][linkval]) { sub[kName][linkval] = 0;}
                        sub[kName][linkval]++;
                    }
                    else {
                        if (!sub[kName].andMore) { sub[kName].andMore = 0; }
                        sub[kName].andMore++;
                        //if (!sub[kName][linkval]) { sub[kName][linkval] = 0;}
                        //sub[kName][linkval]++;
                    }
                }









            }


        }







}

function prettyprint(shape) {
  console.log(util.inspect(shape, {showHidden: false, depth: null}));
}





module.exports = {
  datashape: getDataShape,
  stats: stats,
  distinct: distinct,
  objtype: objtype,
  stringstats: stringstats,
  datestats: datestats,
  first: ordinal.first,
  last:ordinal.last,
  prettyprint: prettyprint
}
;

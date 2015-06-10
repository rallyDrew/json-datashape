var _ = require('lodash');

function stats(number, sub)
{
        number = parseInt(number);

        if (!sub) { sub = {sum:0, count:0, avg:0, max :number, min:number };}


        sub.sum = sub.sum + number;
        sub.count++;
        sub.avg = (sub.sum / sub.count);
        if (number > sub.max) { sub.max = number;}
        if (number < sub.min) { sub.min = number;}
        return sub;


}

function first(value, sub) {
  if (!sub) { sub = value; }
  return sub;
}

function last(value, sub) {
  sub = value;
  return sub;
}

function datestats(value, sub) {

  if (!sub) { sub = {datestats: true, nulls:0, count:0, max :null, min:null };}
  sub.count++;
  if (value)
  {
  value = new Date(value);
  
    //value = new Date(value);
    if (sub.max === null) { sub.max = value;}
    if (sub.min === null) { sub.min = value;}

    if (value > sub.max) { sub.max = value;}
    if (value < sub.min) { sub.min = value;}

  }

  else {
    sub.nulls++;
  }



  return sub;



}

function stringstats(value, sub) {
  number = value.length || -1;
  if (!sub) { sub = {stringstats: true, sum:0, nulls:0, count:0, avg:0, max :number, min:number };}


  if (number == -1) { sub.nulls++; }

  else {
    sub.sum = sub.sum + number;
    sub.count++;
    sub.avg = (sub.sum / sub.count);
    if (number > sub.max) { sub.max = number;}
    if (number < sub.min) { sub.min = number;}
  }

  return sub;
}

function objtype(value, sub) {
     value = ({}).toString.call(value).match(/\s([a-zA-Z]+)/)[1].toLowerCase();

     if (!sub) { sub = {} }; //declare an empty sub

     sub[value] = sub[value] || 0;
     sub[value]++;
     return sub;
}


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

        nestlevel = recursionPolice(nestlevel, 50); //Throw an exception if we exceed depth of 50

        var keyValues = Object.keys(obj);





        for (var ki in keyValues) {

            var kName = keyValues[ki];

            if (_.isArray(obj[kName])) {
              for (var i in obj[kName]) {
                getDataShape(obj[kName][i], sub[kName], nestlevel);
              }
              //What to do if we encounter an array
            }

            else if (_.isObject(obj[kName])) {
                //what to do if we encounter a sub-object
                var subObj = obj[kName];

                if (!sub[kName]) { sub[kName] = {};}
                getDataShape(subObj, sub[kName], nestlevel);
            }



            else {

                if (sub[kName] === undefined) { sub[kName] = {}; }



                if (_.isNumber(sub[kName])) {
                  //The shape template was populated with an integer. Let's count all the things
                    sub[kName]++;
                }

                else if (sub[kName] == null) {
                    //no-op
                }

                else if (_.isFunction(sub[kName])) {
                    sub[kName +'_data'] = sub[kName](obj[kName], sub[kName + '_data']);

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


module.exports = {
  datashape: getDataShape,
  stats: stats,
  objtype: objtype,
  stringstats: stringstats,
  datestats: datestats,
  first: first,
  last:last
}
;

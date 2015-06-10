var _ = require('lodash');


function getDataShape(obj, sub) {
        var keyValues = Object.keys(obj);

        for (var ki in keyValues) {
            var kName = keyValues[ki];



            if (_.isObject(obj[kName])) {
                var subObj = obj[kName];

                if (!sub[kName]) { sub[kName] = {};}
                getDataShape(subObj, sub[kName]);
            }

            else {

                if (sub[kName] === undefined) { sub[kName] = {}; }



                if (_.isNumber(sub[kName])) {
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


module.exports = getDataShape;

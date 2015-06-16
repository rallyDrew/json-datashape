var _ = require('lodash');

function distinct(value, sub) {

  //Set the result to the first record we find
  if (!sub) { sub = value; }

  //Do we still only have one distinct value?
  if (sub == value) {
    return sub;
  }

  //Uh oh, we're here because we have more than one distinct value
  //Let's make sure we have an array of values

  if (!_.isArray(sub)) {
    sub = [sub];
  }

  //Is our value already in the array?
  if (sub.indexOf(value) == -1) {
    //nope, add it
    sub.push(value);
  }

  return sub;



}


module.exports = distinct;

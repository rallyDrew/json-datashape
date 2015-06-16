function first(value, sub) {
  if (!sub) { sub = value; }
  return sub;
}


function last(value, sub) {
  sub = value;
  return sub;
}

module.exports = {
  first: first,
  last: last
};

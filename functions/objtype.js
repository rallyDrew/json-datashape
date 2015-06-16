function objtype(value, sub) {
     value = ({}).toString.call(value).match(/\s([a-zA-Z]+)/)[1].toLowerCase();

     if (!sub) { sub = {}; } //declare an empty sub

     sub[value] = sub[value] || 0;
     sub[value]++;
     return sub;
}

module.exports = objtype;

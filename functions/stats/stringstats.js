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

module.exports = stringstats;

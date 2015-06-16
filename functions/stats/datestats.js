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

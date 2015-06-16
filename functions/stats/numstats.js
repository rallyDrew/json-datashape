function stats(number, sub)
{
        number = parseInt(number);


        if (!sub) { sub = {sum:0, count:0, avg:0, max :number, min:number, NaNCount:0 };}

        if (number == NaN) {
          sub.NaNCount++;
        }
        else  {
          sub.sum = sub.sum + number;
          sub.count++;
          sub.avg = Math.round((sub.sum / sub.count)*1000)/1000;
          if (number > sub.max) { sub.max = number;}
          if (number < sub.min) { sub.min = number;}

        }

        return sub;


}


module.exports = stats;

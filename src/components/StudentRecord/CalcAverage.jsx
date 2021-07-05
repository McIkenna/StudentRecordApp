import React from 'react'

export const  CalcAverage = (grades) => {
    var total = 0;
   for(var i=0 ; i < grades.length; i++ ){
       total += Number(grades[i]);
   }
    var average = total/grades.length;
    return average;
}


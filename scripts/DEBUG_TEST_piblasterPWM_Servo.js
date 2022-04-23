//https://github.com/sarfata/pi-blaster
//Build and install directly from source
var piblaster = require('pi-blaster.js');
const timeMilliSec = 2000;
const pulseWidthMin = 0.05; //0.00 will cause it to not work
const pulseWidthMax = 0.35;
let pulseWidth = pulseWidthMax

setInterval(() => { 
  piblaster.setPwm(22, pulseWidth); 
  console.log(pulseWidth)
  if (pulseWidth == pulseWidthMin) {
      pulseWidth = pulseWidthMax
  } else if (pulseWidth == pulseWidthMax) {
    	pulseWidth = pulseWidthMin;
  }
}, timeMilliSec);

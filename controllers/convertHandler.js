/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
 
  // Need to check for units in numbers because input containing only units is valid for both, but input containing only
  // a number is only valid for numbers.
  const validation = { numbers: /^(\d*\.?\d+(?:\/\d*\.?\d+)*)?(gal|l|lbs|kg|km|mi)?/i,
                         units: /(?<!\D+)(gal|l|lbs|kg|km|mi|)$/i };

  const unitDict =      { 'GAL':  'L',
                          'L'  :  'Gal',
                          'LBS':  'Kg',
                          'KG' :  'Lbs',
                          'MI' :  'Km',
                          'KM' :   'Mi',
                          'INVALID UNITS' : 'invalid units'};
  
  const wordDict =     { 'GAL' : 'gallons',
                         'L'   : 'liters',
                         'LBS' : 'pounds',
                         'KG'  : 'kilograms',
                         'MI'  : 'miles',
                         'KM'  : 'kilometers',
                        'INVALID UNITS' : 'invalid units'};

  this.getNum = function(input) 
  {
    let result;
    result = input.match(validation.numbers);
    
    // when there are no matches, the number is invalid
    if(!result) {return 'invalid number';}

    // when the number is not defined 
    // and the unit is valid, the number is 1.
    // and the unit is not valid, the number is invalid
    if( !result[1] ) {return result[2] ? 1 : 'invalid number'; }

    let numbers = result[1].split("/");
    let numLen = numbers.length;

    if(numLen == 1)
    {
      return numbers[0];
    }
    else if (numLen == 2)
    {
      return (numbers[1] == 0) ? 'invalid number' : numbers[0]/numbers[1];
    }
    return 'invalid number';
  };
  
  this.getUnit = function(input) {   
    var result;
    result = input.match(validation.units);
    if(!result) {return 'invalid units';}
    return result[1] ? result[1] : 'invalid units';
  };
  
  this.getReturnUnit = function(initUnit) {
    return unitDict[initUnit.toUpperCase()];
  };

  this.spellOutUnit = function(unit) {    
    return wordDict[unit.toUpperCase()];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let n = initNum;
    switch(initUnit.toUpperCase()){
      case ('L'):
        n /= galToL;
        break;
      case ('GAL'):
        n *= galToL;
        break;
      case ('LBS'):
        n *= lbsToKg;
        break;
      case ('KG'):
        n /= lbsToKg;
        break;
      case ('MI'):
        n *= miToKm;
        break;
      case ('KM'):
        n/= miToKm;
        break;
      default:
        return null;
    }
    return n;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    
    if(typeof returnNum === 'number')
    {
      returnNum = returnNum.toFixed(5);
    }
    var result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;    
    return result;
  };
  
}

module.exports = ConvertHandler;

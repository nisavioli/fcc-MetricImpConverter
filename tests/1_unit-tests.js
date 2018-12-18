/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      let input = '32.2L';
      assert.equal(convertHandler.getNum(input),32.2);
      done();
    });
    
    test('Fractional Input', function(done) {
      let input = '1/2L';
      assert.equal(convertHandler.getNum(input), .5);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      let testVals = [{input:   '1/1.0L',   expected: 1},
                      {input:   '1.0/1L',   expected: 1},
                      {input:   '1.0/1.0L', expected: 1},
                      {input:    '.5/2.5L', expected: 0.2}];
      testVals.forEach( test => { assert.equal(convertHandler.getNum(test.input), test.expected); });      
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      let input = '1/2/3L'
      assert.equal(convertHandler.getNum(input), 'invalid number');
      done();
    });
    
    test('No Numerical Input', function(done) {
      assert.equal(convertHandler.getNum('L'), 1);
      assert.equal(convertHandler.getNum(''), 'invalid number');
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        assert.equal(convertHandler.getUnit(ele), ele);
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      assert.equal(convertHandler.getUnit('1a'), 'invalid units');
      assert.equal(convertHandler.getUnit(''), 'invalid units');
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['L','Gal','Km','Mi','Kg','Lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      let testVals = [{input: 'gal' , expect: 'gallons'},
                      {input: 'l'   , expect: 'liters'},
                      {input: 'mi'  , expect: 'miles'},
                      {input: 'km'  , expect: 'kilometers'},
                      {input: 'lbs' , expect: 'pounds'},
                      {input: 'kg'  , expect: 'kilograms'}];
      testVals.forEach( tv => assert.equal(convertHandler.spellOutUnit(tv.input), tv.expect) );      
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      assert.approximately(convertHandler.convert(1, 'l'), .264172, 0.1);
      done();
    });
    
    test('Mi to Km', function(done) {
      assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1);
      done();
    });
    
    test('Km to Mi', function(done) {
      assert.approximately(convertHandler.convert(1, 'km'), 0.621371, 0.1);
      done();
    });
    
    test('Lbs to Kg', function(done) {
      
      assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, 0.1);
      done();
    });
    
    test('Kg to Lbs', function(done) {
      
      assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.1);
      done();
    });
    
  });

});
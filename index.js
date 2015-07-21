'use strict';

var deconstructNumberFormat = require('deconstruct-number-format');
var formatFactory = require('format-number');

exports = module.exports = function formatNumberWithString(value, requiredFormat, includeUnits, separate) {

  includeUnits = includeUnits === false ? false : true;
  separate = separate === false ? false : true;
  
  var deconstructedFormat = []

  if (requiredFormat) deconstructedFormat = deconstructNumberFormat(requiredFormat.trim());
  
  value = value + ''; //make a string
  value = value.length ? value.trim() : '';
  
  var options = [];
  
  var format = formatFactory({
    negativeType: deconstructedFormat.negativeType,
    negativeLeftSymbol: deconstructedFormat.negativeLeftSymbol,
    negativeRightSymbol: deconstructedFormat.negativeRightSymbol,
    negativeLeftOut: deconstructedFormat.negativeLeftPos === 0,
    negativeRightOut: deconstructedFormat.negativeRightPos === 0,
    prefix: deconstructedFormat.prefix,
    suffix: deconstructedFormat.suffix,
    integerSeparator: deconstructedFormat.integerSeparator,
    decimalsSeparator: deconstructedFormat.decimalsSeparator,
    decimal: deconstructedFormat.decimalChar,
    padLeft: deconstructedFormat.padLeft,
    padRight: deconstructedFormat.padRight,
    round: deconstructedFormat.maxRight,
    truncate: null
  })

  return format(value, includeUnits, separate);

};
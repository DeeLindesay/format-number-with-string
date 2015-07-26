'use strict';

var test = require('testit');
var format = require('../');
var assert = require('assert');

//missing format string
test('no format string', function () {
  var actual = format('-56343.2233');
  var expected = '-56,343.2233';
  assert.deepEqual(actual, expected);
});
test('empty string as format string', function () {
  var actual = format('-56343.2233', '');
  var expected = '-56,343.2233';
  assert.deepEqual(actual, expected);
});

//missing values
test('missing value "" with 0 in format', function () {
  var actual = format('', '(#0.##)');
  var expected = '';
  assert.deepEqual(actual, expected);
});
test('missing value ""', function () {
  var actual = format('', '(##.##)');
  var expected = '';
  assert.deepEqual(actual, expected);
});
test('missing value 0 with 0 in format', function () {
  var actual = format(0, '(#0.##)');
  var expected = '0';
  assert.deepEqual(actual, expected);
});
test('missing value 0', function () {
  var actual = format(0, '(#0.##)');
  var expected = '0';
  assert.deepEqual(actual, expected);
});

//negative types
test('brackets as negativeType', function () {
  var actual = format('-56.23', '(##.##)');
  var expected = '(56.23)';
  assert.deepEqual(actual, expected);
});
test('left as negativeType', function () {
  var actual = format('-56.23', '-##.##');
  var expected = '-56.23';
  assert.deepEqual(actual, expected);
});
test('right as negativeType', function () {
  var actual = format('-56.23', '##.##-');
  var expected = '56.23-';
  assert.deepEqual(actual, expected);
});
test('no negative', function () {
  var actual = format('-56.23', '##.##');
  var expected = '56.23';
  assert.deepEqual(actual, expected);
});

//prefix and suffix
test('prefix £', function () {
  var actual = format(56.23, '-£##.##');
  var expected = '£56.23';
  assert.deepEqual(actual, expected);
});
test('suffix /year', function () {
  var actual = format('56.23', '-##.## /year');
  var expected = '56.23 /year';
  assert.deepEqual(actual, expected);
});
test('prefix and suffix', function () {
  var actual = format('56.23', '-£##.## /year');
  var expected = '£56.23 /year';
  assert.deepEqual(actual, expected);
});
test('prefix and suffix with not includeUnits', function () {
  var actual = format('56.23', '-£##.## /year', {noUnits:true});
  var expected = '56.23';
  assert.deepEqual(actual, expected);
});

//outside and inside
test('negative outside prefix', function () {
  var actual = format('-56.23', '-£##.##');
  var expected = '-£56.23';
  assert.deepEqual(actual, expected);
});
test('negative inside prefix', function () {
  var actual = format('-56.23', '£-##.##');
  var expected = '£-56.23';
  assert.deepEqual(actual, expected);
});
test('negative inside suffix', function () {
  var actual = format('-56.23', '##.##- /year');
  var expected = '56.23- /year';
  assert.deepEqual(actual, expected);
});
test('negative outside suffix', function () {
  var actual = format('-56.23', '##.##/year -');
  var expected = '56.23/year -';
  assert.deepEqual(actual, expected);
});
test('brackets inside prefix outside suffix', function () {
  var actual = format('-56.23', '£(##.##/year)');
  var expected = '£(56.23/year)';
  assert.deepEqual(actual, expected);
});
test('brackets outside prefix inside suffix', function () {
  var actual = format(-56.23, '(£##.##) /year');
  var expected = '(£56.23) /year';
  assert.deepEqual(actual, expected);
});
test('brackets both inside', function () {
  var actual = format('-56.23', '£(##.##) /year');
  var expected = '£(56.23) /year';
  assert.deepEqual(actual, expected);
});

//padding
test('padLeft', function () {
  var actual = format('35', 'RPL 00000000');
  var expected = 'RPL 00000035';
  assert.deepEqual(actual, expected);
});
test('padRight', function () {
  var actual = format('355.2', '###.000');
  var expected = '355.200';
  assert.deepEqual(actual, expected);
});

//rounding
test('rounding', function () {
  var actual = format('355.23425', '###.00');
  var expected = '355.23';
  assert.deepEqual(actual, expected);
});

//decimal and separators
test('spaces as sep, comma as decimal', function () {
  var actual = format(-23342456.2343278, '$(# ###,### #) per year');
  var expected = '$(23 342 456,234 327 8) per year';
  assert.deepEqual(actual, expected);
});
test('. as decimal , as int separator, no dec separator', function () {
  var actual = format('-9342456.2353278', '-$9,###,##0.00#### per year');
  var expected = '-$9,342,456.2353278 per year';
  assert.deepEqual(actual, expected);
});
test('comma as decimal, . as separator', function () {
  var actual = format('-23342456.2343278', '$(#.###,###.#) per year');
  var expected = '$(23.342.456,234.327.8) per year';
  assert.deepEqual(actual, expected);
});
test('comma as decimal, . as separator with override or no separator and no units', function () {
  var actual = format('-23342456.2343278', '$(#.###,###.#) per year', {noUnits: true, noSeparator: true});
  var expected = '(23342456,2343278)';
  assert.deepEqual(actual, expected);
});



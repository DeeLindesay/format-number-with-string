# format-number-with-string
Expects a valid number in 'computer' format and a format string (eg '-£#,###,##0.000 /m', '(## years)') which is used to format the number.

Basically a wrapper that uses deconstruct-format-string to deconstruct the format and then passes the results to format-number to do the formatting

## The number
Can be a number or a string of a number

## Format String Can Include:
- negative signs before or after prefix text or before or after suffix text
- brackets as negative signs before/after prefix/suffix
- prefix and suffix texts
- `.` or `,` as decimal point
- space or `.` or `,` as thousand separators
- space or `.` or `,` as thousanths separators
- `#`, `9` or `0` as number place holders
If the format string is undefined or an empty string then defaults are used (see format-number)

## Use

```
var format = require('format-number-with-string');
var overrideOptions = {noUnits: true, noSeparator: true};

var output1 = format(3345.23, '-£#,###,###.00');
var output2 = format(3345.23, '-£#,###,###.00', overrideOptions);

```
## Format Notes and Examples

### Padding
A `0` will pad to that position
- `92332.42,'## ##0.##0 ##'`  returns '92 332.420'
- `'.42','## ##0.##0 ##'`  returns '0.420'
- `33, '00000'` returns '00033' 

### Rounding
A `0` or `9` in the last decimal space will cause rounding to that number of places
- `'92332.42467','## ##0.##0'`  returns '92 332.425'

### Negatives
WARNING - omitting a negative from the format string will return the absolute value
- `'-332.42','(###.###)'`  returns '(332.42)'
- `'-332.42','- ###.###'`  returns '- 332.42'
- `'-332.42','###.###-'`  returns '332.42-'
- `'-332.42','###.###'`  returns '332.42'

### Decimal points/thousands separators in the format string:
If a format ends in a . or , then this will be taken as the decimal character UNLESS the same character is used elsewhere so:
- `'923324234','#,###.'`  returns '923,324,234'
- `'923324234','#.###,'`  returns '923.324.234'

If a format only has one of ',' or '.' and the character only appears once it is taken as the decimal point
- `'2332.42','#,###'`  returns '2332,42'
- `'2332.42','#.###'`  returns '2332.42'

If the character appears twice in the format string it is a separator
- `'923324234','#,###,###'`  returns '923,324,234'

When in doubt '.' in the format string is the decimal point, so 
- `'234.45645','#.###,#'` returns '234.456,45'
To create a similar structure with decimalChar as ',', just add a '.' at start or end or extend expression eg
- `.#.###,#`
- `#.###,#.`
- `#.###.###,#`

### Units/Prefix Text
Units can be before or after negative symbols.
Prefix text cannot contain number placeholder characters
`'-233278', '($# ###.### # per year)'` returns '($233 278 per year)'
`'-233278', '$# ##0.00# #- per year'` returns '$233 278- per year';
`'-456.23', '-$# ##0.00# # per year'` returns '-$456.23 per year';

## Override Options

As used in format-number
- `noUnits` boolean: if true will override and leave out prefix and suffix; default= false
- `noSeparator` - boolean: if true will override both integer and decimals separator and leave them out


## Does not work for:
- structured reference numbers, eg 9999-9999
- ignores and removes leading and trailing spaces (but retains those between pre/post fix and negative symbols etc)
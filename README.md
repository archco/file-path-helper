# File Path Helper

Helpful methods for handling file path.

## Table of contents

- File Methods
  - [glob](#glob)
  - [replaceSeparator](#replaceSeparator)
  - [trimDir](#trimDir)
  - [setDir](#setDir)
  - [getLastNumber](#getLastNumber)
  - [removeLastNumber](#removeLastNumber)
  - [autoIncrease](#autoIncrease)
  - [resolveOutputFile](#resolveOutputFile)
  - [bytesToSize](#bytesToSize)
  - [parseSize](#parseSize)
- String Methods
  - [truncate](#truncate)
  - [sanitize](#sanitize)
- Array Methods
  - [naturalSort](#naturalSort)
  - [filter](#filter)
  - [chunks](#chunks)
- Date Methods
  - [parseDate](#parseDate)
  - [getDates](#getDates)
  - [diffDays](#diffDays)
- [License](#License)

## File Methods

### glob

> This method returns **Promise** object.

[Glob](https://github.com/isaacs/node-glob#glob)

- @param `string` pattern
- @param `GlobOptions` options
- @returns `Promise.<Array<string>, Error>`

Example

``` js
import { glob } from 'file-path-helper';

async function getFiles() {
  const files = await glob('*.*');
  return files;
}
```

### replaceSeparator

Replace directory separator.

- @param `string` path
- @param `Separator` separator default: '/'
- @returns `string`

### trimDir

Append last slash to directory.

- @param `string` dir
- @param `Separator` separator default: '/'

### setDir

Set directory part of path.

- @param `string` path
- @param `string` dir
- @param `Separator` separator default: '/'
- @returns `string`

Example

``` js
import { setDir } from 'file-path-helper';

const newPath = setDir('dir/old/file.txt', 'new');
// newPath = 'new/file.txt'
```

Set directory part of path.

### getLastNumber

Get last number from path.

- @param `string` path
- @returns `string`

Example

``` js
import { getLastNumber } from 'file-path-helper';

const num = getLastNumber('my-favorite-13.txt');
// num = '13'
```

### removeLastNumber

Remove last number from file name.

- @param `string` file
- @returns `string`

Example

``` js
import { removeLastNumber } from 'file-path-helper';

const file = removeLastNumber('my-favorite-13.txt');
// file = 'my-favorite.txt'
```

### autoIncrease

> This method returns **Promise** object.

If the same file exists, It's returns filename what increased number.

- @param `string` path
- @returns `Promise<string>` auto increased path.

Example

``` js
import { autoIncrease } from 'file-path-helper';

const file = await autoIncrease('dogs.txt');
// file = 'dogs (2).txt';
```

### resolveOutputFile

Resolve output filename using templates such as `{name}`, `{source}` or `{ext}`.

- @param `string` output
- @param `string` source
- @returns `string`

Example

``` js
import { resolveOutputFile } from 'file-path-helper';

const output = resolveOutputFile('{name}-fixed.{ext}', 'dogs.txt');
// output = 'dogs-fixed.txt'
```

### bytesToSize

Converts bytes to human readable size. e.g. `10 MB` `1.25 GB`

- @param `number` bytes
- @param `number` decimals - default: 2
- @returns `string`

Example

``` js
import { bytesToSize } from 'file-path-helper';

const fileSize = bytesToSize(2048);
// fileSize = '2 KB'
```

### parseSize

Parses string that includes file size and operator.

``` ts
interface Size {
  bytes: number;
  operator: string; // '>', '>=', '=' ...
}
```

- @param `string` size - e.g `1kb` `10.5 MB` `>1gb` `=< 10 kb`
- @returns `Size`

Example

``` js
import { parseSize } from 'file-path-helper';

const size = parseSize('> 1mb');
// size.bytes = 1048576
// size.operator = '>'
```

## String Methods

### truncate

Truncate string what given length.

- @param `string` str
- @param `number` length
- @param `string` ellipsis - default: `'…'`
- @returns `string`

Example

``` js
import { truncate } from 'file-path-helper';

const str = truncate('1234567890', 6);
// str = '12345…'
```

### sanitize

Sanitize string for filename safe.

- @param `string` str
- @returns `string` replacer - default: `''`

Example

``` js
import { sanitize } from 'file-path-helper';

const str = sanitize(' he*llo/_<wo:rld');
// str = 'hello_world'
```

## Array Methods

### naturalSort

Sorting array of alphanumerical strings naturally.

- @param `string[]` arr
- @returns `string[]`

Example

``` js
const arr = [
  'test 1.txt',
  'test 11.txt',
  'test 3.txt',
];
const sorted = naturalSort(arr);
// sorted = [
//   'test 1.txt',
//   'test 3.txt',
//   'test 11.txt',
// ];
```

### filter

Filtering an array with `Promise`.

- @param `T[]` arr - filtering target array.
- @param `function(T, number, T[]): Promise<boolean>` cb - callback function for filtering. arguments is value, index, array.
- @returns `Promise<T[]>`

Example

``` js
const arr = [1, 2, 3, 4, 5];
const doSomething = () => Promise.resolve();

const res = await filter(arr, async v => {
  await doSomething();
  return (v % 2) == 1;
});
// res = [1, 3, 5]
```

### chunks

Split array into chunks.

- @param `T[]` arr
- @param `number` size
- @returns `T[][]`

Example

``` js
const arr = [1, 2, 3, 4, 5, 6, 7];
const res = chunks(arr, 3);
// res = [[1, 2, 3], [4, 5, 6], [7]]
```

## Date Methods

### parseDate

Parsing the value to date. it's useful handling 'date'(not hours and minutes) purpose.

``` ts
interface ParsedDate {
  date: Date;
  year: number;
  month: number;
  day: number;
  toDateString: () => string;
}
```

- @param `string`|`number`|`Date` value
- @returns `ParsedDate`

Example

``` js
const parsed = parseDate('feb 17, 1995 03:24:00');
// parsed = {
//   date: new Date('feb 17, 1995 03:24:00'), // Date object
//   year: 1995,
//   month: 2,
//   day: 17,
// }
// parsed.toDateString() // '1995-02-17' ISO date format
```

### getDates

Returns array of date strings.

- @param `string` value - date string. e.g. '2020-01-01' or '2020-01-01~2020-01-31'
- @returns `string[]`

Example

``` js
const dates = getDates('2020-02-01~2020-02-05');
// dates = [
//   '2020-02-01',
//   '2020-02-02',
//   '2020-02-03',
//   '2020-02-04',
//   '2020-02-05',
// ]
```

### diffDays

Returns difference between two dates.

- @param `string`|`number`|`Date` a
- @param `string`|`number`|`Date` b
- @returns `number`

Example

``` js
const days = diffDays('2020-02-24', '2020-03-02');
// days = 7
```

## License

[MIT License](https://github.com/archco/file-path-helper/blob/master/LICENSE)

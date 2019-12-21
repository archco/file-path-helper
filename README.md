# File Path Helper

Helpful methods for handling file path.

## Methods

- [globPromise](#globPromise)
- [replaceSeparator](#replaceSeparator)
- [trimDir](#trimDir)
- [setDir](#setDir)
- [getLastNumber](#getLastNumber)
- [removeLastNumber](#removeLastNumber)
- [naturalSort](#naturalSort)
- [autoIncrease](#autoIncrease)
- [resolveOutputFile](#resolveOutputFile)
- [bytesToSize](#bytesToSize)
- [parseSize](#parseSize)

### globPromise

> This method returns **Promise** object.

[Glob](https://github.com/isaacs/node-glob#glob) promise.

- @param `string` pattern
- @param `GlobOptions` options
- @returns `Promise.<Array<string>, Error>`

Example

``` js
const { globPromise } = require('file-path-helper');

async function getFiles() {
  const files = await globPromise('*.*');
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
const { setDir } = require('file-path-helper');

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
const { getLastNumber } = require('file-path-helper');

const num = getLastNumber('my-favorite-13.txt');
// num = '13'
```

### removeLastNumber

Remove last number from file name.

- @param `string` file
- @returns `string`

Example

``` js
const { removeLastNumber } = require('file-path-helper');

const file = removeLastNumber('my-favorite-13.txt');
// file = 'my-favorite.txt'
```

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

### autoIncrease

> This method returns **Promise** object.

If the same file exists, It's returns filename what increased number.

- @param `string` path
- @returns `Promise<string>` auto increased path.

Example

``` js
const { autoIncrease } = require('file-path-helper');

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
const { resolveOutputFile } = require('file-path-helper');

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
const { bytesToSize } = require('file-path-helper');

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
const { parseSize } = require('file-path-helper');

const size = parseSize('> 1mb');
// size.bytes = 1048576
// size.operator = '>'
```

## License

[MIT License](https://github.com/archco/file-path-helper/blob/master/LICENSE)

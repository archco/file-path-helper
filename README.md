# File Path Helper

Helpful methods for handling file path.

## Methods

### Glob Promise

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

### Replace Separator

Replace directory separator.

- @param `string` path
- @param `Separator` separator default: '/'
- @returns `string`

### Trim Dir

Append last slash to directory.

- @param `string` dir
- @param `Separator` separator default: '/'

### Set Dir

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

### Get Last Number

Get last number from path.

- @param `string` path
- @returns `string`

Example

``` js
const { getLastNumber } = require('file-path-helper');

const num = getLastNumber('my-favorite-13.txt');
// num = '13'
```

### Remove Last Number

Remove last number from file name.

- @param `string` file
- @returns `string`

Example

``` js
const { removeLastNumber } = require('file-path-helper');

const file = removeLastNumber('my-favorite-13.txt');
// file = 'my-favorite.txt'
```

### Sort Files by Last Number

Sort files by last number.

- @param `string[]` files
- @returns `string[]`

### Auto Increase

> This is **Async Function**

If the same file exists, It's returns filename what increased number.

- @param `string` path
- @returns `Promise<string>` auto increased path.

Example

``` js
const { autoIncrease } = require('file-path-helper');

const file = await autoIncrease('dogs.txt');
// file = 'dogs (2).txt';
```

### Resolve Output File

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

## License

[MIT License](https://github.com/archco/file-path-helper/blob/master/LICENSE)

# File Path Helper

Helpful methods for handling file path.

## Methods

### Glob Promise

[Glob](https://github.com/isaacs/node-glob#glob) promise.

- @param `string` pattern
- @param `GlobOptions` options
- @returns `Promise.<Array<string>, Error>`

#### Examples

``` js
const { globPromise } = require('file-path-helper');

async function getFiles() {
  const files = await globPromise('*.*');
  return files;
}
```

### Replace Separator

### Trim Dir

### Set Dir

### Get Last Number

### Remove Last Number

### Sort Files by Last Number

### Auto Increase

### Resolve Output File

## License

MIT License

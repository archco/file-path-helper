const { parse } = require('path');
const glob = require('glob');
const { pathExists } = require('fs-extra');

/**
 * @typedef {'/'|'\\'} Separator Directory Separator
 * @typedef {import('glob').IOptions} GlobOptions Glob Options
 */

/**
 * Glob promise.
 *
 * @param {string} pattern
 * @param {GlobOptions} options
 * @returns {Promise<string[], Error>}
 */
function globPromise(pattern, options) {
  return new Promise((resolve, reject) => {
    glob(pattern, options, (err, files) => {
      err === null ? resolve(files) : reject(err);
    });
  });
}

/**
 * Replace directory separator.
 *
 * @param {string} path
 * @param {Separator} separator default: '/'
 * @returns {string}
 */
function replaceSeparator(path, separator = '/') {
  return path.replace(/(\\|\/)/g, separator);
}

/**
 * Append last slash to directory.
 *
 * @param {string} dir
 * @param {Separator} separator default: '/'
 */
function trimDir(dir, separator = '/') {
  if (!dir) return '';
  return !/[/\\]$/.test(dir) ? dir + separator : dir;
}

/**
 * Set directory part of path.
 *
 * @param {string} path
 * @param {string} dir
 * @param {Separator} separator default: '/'
 * @returns {string}
 */
function setDir(path, dir, separator = '/') {
  const regex = /^(.*[/\\])/;
  dir = trimDir(dir, separator);
  return regex.test(path) ? path.replace(regex, dir) : dir + path;
}


/**
 * Get last number from path.
 *
 * @param {string} path
 * @returns {string}
 */
function getLastNumber(path) {
  const name = parse(path).name;
  const reg = /(\d+|[({[]\d+[)}\]])$/;
  const match = name.match(reg);
  return match ? /\d+/.exec(match[0])[0] : '' ;
}

/**
 * Remove last number from file name.
 *
 * @param {string} file
 * @returns {string}
 */
function removeLastNumber(file) {
  const { dir, name, ext } = parse(file);
  const reg = /(\d+|[({[]\d+[)}\]])$/;
  const newName = name.replace(reg, '').replace(/(\W|_)$/, '');
  return trimDir(dir) + newName + ext;
}

/**
 * Auto increase path.
 * If the same file exists, It's returns filename what increased number.
 *
 * @param {string} path
 * @returns {Promise<string>} auto increased path.
 */
async function autoIncrease(path) {
  // TODO: add parameter `template`: "(n)" or "[n]" ...
  let { dir, name, ext } = parse(path);
  const reg = /\((\d+)\)$/;
  const numbering = name => {
    const num = parseInt(name.match(reg)[1]);
    return name.replace(reg, `(${num + 1})`);
  };
  const newPath = () => trimDir(dir) + name + ext;
  if (await pathExists(newPath())) {
    name = reg.test(name) ? numbering(name) : `${name} (2)`;
    return await autoIncrease(newPath());
  } else {
    return newPath();
  }
}

/**
 * Resolve output file name.
 *
 * @param {string} output
 * @param {string} source
 * @returns {string}
 */
function resolveOutputFile(output, source) {
  const src = parse(source);
  return output.replace(/{(source|name)}/, src.name)
    .replace(/\.{ext}$/, src.ext);
}

/**
 * Convert size in bytes.
 * @see https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
 *
 * @param {number} bytes
 * @param {number} decimals default: 2
 * @returns {string}
 */
function bytesToSize(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
  return `${size} ${sizes[i]}`;
}

/**
 * Parses string that includes file size and operator.
 * @typedef {Object} Size
 * @property {number} bytes
 * @property {string} operator
 *
 * @param {string} size e.g '10.5mb' '>1GB' '=<10kb'
 * @returns {Size} Size
 */
function parseSize(size) {
  const [, o, n, s] = size.match(/(^[><=]*)\s?([0-9]*\.?[0-9]*)\s?([A-Za-z]*)/);
  const k = 1024;
  const sizes = ['BYTES', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = s ? sizes.indexOf(s.toUpperCase()) : 0;
  return {
    bytes: parseFloat(n) * Math.pow(k, i),
    operator: o ? o : '=',
  };
}

module.exports = {
  globPromise,
  replaceSeparator,
  trimDir,
  setDir,
  getLastNumber,
  removeLastNumber,
  autoIncrease,
  resolveOutputFile,
  bytesToSize,
  parseSize,
};

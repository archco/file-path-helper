const { parse } = require('path');
const glob = require('glob');
const { pathExists } = require('fs-extra');

/**
 * Directory Separator
 * @typedef {'/'|'\\'} Separator
*/

/**
 * Glob Options
 * @typedef {import('glob').IOptions} GlobOptions
 */

/**
 * Glob promise.
 *
 * @param {string} pattern
 * @param {GlobOptions} options
 * @returns {Promise.<Array<String>, Error>}
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
  return path.replace(regex, trimDir(dir, separator));
}


/**
 * Get last number from path.
 *
 * @param {string} path
 * @returns {string}
 */
function getLastNumber(path) {
  const name = parse(path).name;
  const reg = /(\d+)$/;
  return reg.test(name) ? name.match(reg)[1] : '';
}

/**
 * Remove last number from file name.
 *
 * @param {string} file
 * @returns {string}
 */
function removeLastNumber(file) {
  const { dir, name, ext } = parse(file);
  const newName = name.replace(/(\d+)$/, '').replace(/(\W|_)$/, '');
  return `${dir ? dir + '/' : ''}${newName}${ext}`;
}

/**
 * Sort files by last number.
 *
 * @param {string[]} files
 * @returns {string[]}
 */
function sortFilesByLastNumber(files) {
  const num = f => parseInt(getLastNumber(f));
  return files.sort((a, b) => num(a) - num(b));
}

/**
 * Auto increase path.
 *
 * @param {string} path
 * @returns {Promise<string>} auto increased path.
 */
async function autoIncrease(path) {
  let { dir, name, ext } = parse(path);
  dir = trimDir(dir);
  const reg = /\((\d+)\)$/;
  const numbering = name => {
    const num = parseInt(name.match(reg)[1]);
    return name.replace(reg, `(${num + 1})`);
  };
  const newPath = () => dir + name + ext;
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

module.exports = {
  globPromise,
  replaceSeparator,
  trimDir,
  setDir,
  getLastNumber,
  removeLastNumber,
  sortFilesByLastNumber,
  autoIncrease,
  resolveOutputFile,
};

/**
 * truncate string.
 *
 * @param {string} str
 * @param {number} length default: 40
 * @param {string} ellipsis default: '…'
 * @returns {string}
 */
function truncate(str, length = 40, ellipsis = '…') {
  return str.length < length
    ? str
    : str.substr(0, length - ellipsis.length) + ellipsis;
}

/**
 * Sanitize string for safe filename.
 * @see https://github.com/parshap/node-sanitize-filename#readme
 *
 * @param {string} str
 * @param {string} replacer default: `''`
 * @returns {string}
 */
function sanitize(str, replacer = '') {
  return str.replace(/(https|http)/g, '') // remove 'http'
    .replace(/\t|[ ]{2,}/g, ' ')          // two spaces or tab -> one space
    .replace(/[/:?<>\\*|"]/g, replacer)   // sanitize
    .trim();
}

module.exports = {
  truncate,
  sanitize,
};

/**
 * Sorting array of alphanumerical strings naturally.
 * @link https://stackoverflow.com/questions/2802341/javascript-natural-sort-of-alphanumerical-strings
 *
 * @param {string[]} arr
 * @returns {string[]}
 */
function naturalSort(arr) {
  const collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base',
  });
  return arr.sort(collator.compare);
}

/**
 * Filtering an array with Promise
 * @see https://stackoverflow.com/questions/33355528/filtering-an-array-with-a-function-that-returns-a-promise
 *
 * @template T
 * @param {T[]} arr - filtering target array.
 * @param {function(T, number, T[]): Promise<boolean>} cb - callback function for filtering. arguments is value, index, array.
 * @returns {Promise<T[]>}
 */
async function filter(arr, cb) {
  const fail = Symbol();
  return (await Promise.all(arr.map(async (v, i, a) => (await cb(v, i, a)) ? v : fail))).filter(i => i !== fail);
}

/**
 * Split array into chunks
 * @see https://stackoverflow.com/questions/8495687/split-array-into-chunks#answer-8495740
 *
 * @template T
 * @param {T[]} arr
 * @param {number} size
 * @returns {T[][]}
 */
function chunks(arr, size) {
  size = size < 1 ? arr.length : size;
  return Array(Math.ceil(arr.length / size)).fill().map((_, index) => index * size).map(begin => arr.slice(begin, begin + size));
}

module.exports = {
  naturalSort,
  filter,
  chunks,
};

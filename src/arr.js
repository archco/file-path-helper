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

module.exports = {
  naturalSort,
};

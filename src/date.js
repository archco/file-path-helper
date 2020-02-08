/**
 * Parsing the value to date. it's useful handling 'date'(not hours and minutes) purpose.
 *
 * @typedef ParsedDate
 * @property {Date} date
 * @property {number} year
 * @property {number} month
 * @property {number} day
 * @property {function(): string} toDateString e.g. '2019-12-25'
 *
 * @param {string|number|Date} value
 * @returns {ParsedDate}
 */
function parseDate(value) {
  const date = new Date(value);
  const twoDigit = x => x.toString().padStart(2, 0);
  return {
    date,
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    toDateString: function () {
      return `${this.year}-${twoDigit(this.month)}-${twoDigit(this.day)}`;
    },
  };
}

/**
 * Get array of date strings
 *
 * @param {string} value date string. e.g. '2020-01-01~2020-01-03'
 * @returns {string[]} e.g. ['2020-01-01', '2020-01-02', '2020-01-03']
 */
function getDates(value) {
  /** @type {function(string[]): Date[]} */
  const sortedDates = dates => dates.map(d => new Date(d)).sort((a, b) => a - b);
  /** @type {function(Date, number): Date} */
  const addDays = (d, days) => {
    const r = new Date(d);
    r.setDate(r.getDate() + days);
    return r;
  }

  if (/~/.test(value)) {
    const [from, until] = sortedDates(value.split('~'));
    const dates = [];
    for (let i = 0; i <= diffDays(from, until); i++) {
      dates.push(parseDate(addDays(from, i)).toDateString());
    }
    return dates;
  } else {
    return [value];
  }
}

/**
 * difference between two dates.
 * @see https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
 *
 * @param {string|number|Date} a
 * @param {string|number|Date} b
 * @returns {number}
 */
function diffDays(a, b) {
  const msPerDay = 1000 * 60 * 60 * 24;
  const [utc1, utc2] = [a, b].map(x => {
    const d = new Date(x);
    return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  });
  return Math.floor((utc2 - utc1) / msPerDay);
}

module.exports = {
  parseDate,
  getDates,
  diffDays,
};
